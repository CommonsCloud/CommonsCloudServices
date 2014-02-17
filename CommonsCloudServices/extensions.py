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
from redis import StrictRedis
from rq import Queue


"""
Import Application Dependencies
"""
from CommonsCloudServices import config


"""
Flask Dependencies 
"""
redis = StrictRedis(host=config.REDIS['HOST'], port=config.REDIS['PORT'], db=config.REDIS['DB'])
q = Queue(connection=redis)
