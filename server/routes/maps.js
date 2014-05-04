var express = require('express');
var router = express.Router();
var url = require('url');
var exec = require('child_process').exec, child;

router.post('/maps', function(request, response) {

  var requested_map_url = 'http://services.commonscloud.org/maps/live';

  var command = 'phantomjs generate.js ' + requested_map_url + ' ' + JSON.stringify(request.body.geography);

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
router.post('/maps/live', function(request, response) {

  console.log('request from /live', request.body);

  var geography_param = JSON.parse(request.body);
  
  response.render('maps.html', { __geojson__: geography_param});
});

module.exports = router;
