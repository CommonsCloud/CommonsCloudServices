var express = require('express');
var router = express.Router();
var url = require('url');
var exec = require('child_process').exec, child;

router.post('/maps', function(request, response) {

  var requested_map_url = 'http://services.commonscloud.org/maps/live';

  var command = 'phantomjs generate.js ' + requested_map_url + ' ' +
                    JSON.stringify(request.body.geography);

  child = exec(command,
    function(error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }

      var image_url = stdout.substring(0, stdout.length - 1);

    response.json({'url': image_url});
  });

});

/* GET home page. */
router.post('/maps/live', function(request, response) {

  try {
    var geography_param = request.body['geography'];

    console.log('request from /live', geography_param);

    response.render('maps.html', { __geojson__: geography_param});
  } catch (e) {
    console.log('ERROR from /maps/live', e);
  }

});

module.exports = router;
