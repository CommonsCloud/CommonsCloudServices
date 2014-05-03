var express = require('express');
var router = express.Router();
var url = require('url');
var exec = require('child_process').exec, child;

router.get('/', function(request, response) {

  response.setHeader("Access-Control-Allow-Origin", "*");

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];
  var format = url_parts.query['format'];

  var requested_map_url = 'http://services.commonscloud.org/maps/live?geography=' + geography_param;

  console.log('requested_map_url', requested_map_url);
  var command = 'phantomjs generate.js ' + JSON.stringify(requested_map_url) + ' ' + format;

  console.log('command', command);

  child = exec(command,
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }

      var image_url = stdout.substring(0, stdout.length -1);

      response.json({'url': image_url});
  });

});

router.get('/pdf', function(request, response) {

  response.setHeader("Access-Control-Allow-Origin", "*");

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  var requested_map_url = 'http://services.commonscloud.org/maps/live?geography=' + geography_param;

  console.log('requested_map_url', requested_map_url);
  var command = 'phantomjs generate_pdf.js ' + JSON.stringify(requested_map_url);

  child = exec(command,
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }

      var image_url = stdout.substring(0, stdout.length -1);

      response.json({'url': image_url});
  });

});

/* GET home page. */
router.get('/live', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  response.render('maps.html', { __geojson__: geography_param});
});

module.exports = router;
