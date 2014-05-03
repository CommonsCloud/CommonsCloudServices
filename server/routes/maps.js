var express = require('express');
var router = express.Router();
var url = require('url');
var exec = require('child_process').exec, child;

router.get('/', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  // var requested_map_url = 'http://services.commonscloud.org/maps/live?';
  var requested_map_url = 'http://www.chesapeakecommons.org';

  console.log('requested_map_url', requested_map_url);

  child = exec('phantomjs hello.js',
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });

});

/* GET home page. */
router.get('/live', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  response.render('maps.html', { __geojson__: geography_param});
});

module.exports = router;
