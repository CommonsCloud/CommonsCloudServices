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
from flask import send_file


"""
Import Application Dependencies
"""
from CommonsCloudServices.extensions import redis
from CommonsCloudServices.extensions import q


"""
Import Module Dependencies
"""
from . import models
from . import module


@module.route('/')
def home():
    """Returns the home page, which is an overview of the project."""

    return render_template('home.html')

@module.route('/user/<string:this_username>/')
def user(this_username):
    """Returns the home page, which is an overview of the project."""

    u = models.create_user(username=this_username)

    print u
    print dir(u)

    return 'grr'


@module.route('/api/')
def rest_api():
    """Base route for a RESTful API service."""

    return jsonify({"error": "Not implemented. A RESTful API service."})


@module.route('/capture/')
def get_capture():
    """Directly returns captures based on valid request parameters."""

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

    q.enqueue(models.q_capture_put, image, **capture.arguments)

    return send_file(image)
