"""
For CommonsCloud copyright information please see the LICENSE document
(the "License") included with this software package. This file may not
be used in any manner except in compliance with the License

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""


"""
Import Flask Dependencies
"""
from flask import jsonify
from flask import render_template
from flask import request
from flask import send_from_directory
from flask import url_for


"""
Import Application Dependencies
"""
from CommonsCloudServices import config

from CommonsCloudServices.extensions import redis
from CommonsCloudServices.extensions import q

from CommonsCloudServices.utilities import sanitize_string


"""
Import Module Dependencies
"""
from . import models
from . import module


"""
A basic landing page, just in case folks aren't familiar with
the CommonsCloudServices API

@return (json)
  Returns a welcome message and how to use the API

"""
@module.route('/', methods=['GET'])
def index():
  
  message = {
    'message': 'Welcome to CommonsCloudServices, if you\'ve arrived at this URL you probably need to read the documentation (https://github.com/CommonsCloud/CommonsCloudServices/README.md)'
  }

  return jsonify(message), 200


"""
Create a user name, token, and secret in the database
for users to create a request for
"""
@module.route('/user/<string:username>/', methods=['GET'])
def user(username):

  """
  Create a user in our Redis database
  """
  username_ = sanitize_string(username)
  u = models.create_user(username=username_)

  uuid_ = u[0].replace('CommonsCloudServices::user,', '')
  secret_ = u[1]

  message = {
    'uuid': uuid_,
    'secret': secret_
  }
  
  return jsonify(message), 200


@module.route('/image/<string:image_path>', methods=['GET'])
def get_image(image_path):
  image_uri = config.CAPTURES_ROOT, image_path
  print image_uri
  return send_from_directory(config.CAPTURES_ROOT, image_path)


@module.route('/capture/', methods=['GET'])
def get_capture():

  if not request.args.get('user') or not request.args.get('token'):
    return jsonify({"error": "A valid USER and TOKEN are required."})

  if not request.args.get('url'):
    return jsonify({"error": "A valid URL is required."})

  user = models.User(request.args)

  if not user.is_valid():
    return jsonify({"error": "Either the USER or TOKEN is invalid."})

  capture = models.Capture(request.args)

  image = redis.get(capture.get_key())

  if image:
    return send_file(image)

  image = capture.capture()

  q.enqueue(models.q_capture_put, image['image'], **capture.arguments)

  message = {
    'uri': url_for('service_pdf.get_image', image_path=image['filename'], _external=True)
  }
  
  return jsonify(message), 200
