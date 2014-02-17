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
from flask import Flask


"""
Import Application Dependencies
"""
from CommonsCloudServices import config

from CommonsCloudServices.errors import load_errorhandlers

from CommonsCloudServices.extensions import redis, q

from CommonsCloudServices.utilities import load_configuration
from CommonsCloudServices.utilities import load_blueprints


"""
Setup our base Flask application, retaining it as our application
object for use throughout the application
"""
def create_application(name = __name__, env = 'development'):
    
    app = Flask(__name__, static_path = '/static')

    # Load our default configuration
    load_configuration(app, env)
            
    # Load our application's blueprints
    load_blueprints(app)

    # Load default application routes/paths
    load_errorhandlers(app)

    return app
