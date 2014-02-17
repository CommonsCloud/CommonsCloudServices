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

import os


"""
These configuration variables are not tied to a specific enviornment, we can
consider these the default variables. They can be overriden later on in this
configuration file by any of the other enviornments, these just give us a jump
start on the rest, and ensuring we're being as DRY as possible.
"""  

# Generic settings
DEBUG = False
SECRET_KEY = 'n@11%?-^j!v`oe7MPxM7sx41bqL=QDmfg+U5Ef6@.oYefGUu@`]&bAD5X&U7!B>G'

CONF_ROOT = os.path.abspath(os.path.dirname(__file__))

APP_ROOT = os.path.abspath(os.path.dirname(CONF_ROOT))

WORK_ROOT = os.path.abspath(os.path.dirname(APP_ROOT))

TEMPLATE_ROOT = os.path.join(APP_ROOT, 'templates')

STATIC_ROOT = os.path.join(WORK_ROOT, 'static')

CAPTURES_ROOT = os.path.join(STATIC_ROOT, 'captures')

STATIC_URL = '/static/'

REDIS = {
    'HOST': '127.0.0.1',
    'PORT': 6379,
    'DB': 0,
}

REDIS_URL = 'redis://' + REDIS['HOST'] + ':' + unicode(REDIS['PORT']) + '/' + \
            unicode(REDIS['DB'])

REDIS_KEY_PREFIX = 'CommonsCloudServices::'

PHANTOM = '/usr/local/bin/phantomjs'

CASPER = '/usr/local/bin/casperjs'

CAPTURE_SCRIPT = os.path.join(APP_ROOT, 'capture.js')


# Flask-Mail
MAIL_SERVER = 'smtp.mandrillapp.com'
MAIL_PORT = 465
MAIL_USE_SSL = True
MAIL_USERNAME = 'joshua@viableindustries.com'
MAIL_PASSWORD = 'MPzhKRLr1FQLUUD9Szufgw'
DEFAULT_MAIL_SENDER = 'support@commonscloud.org'
