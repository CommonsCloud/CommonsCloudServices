var express = require('express');
var router = express.Router();
var url = require('url');
var phantom = require('phantom');

/* GET home page. */
router.get('/', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  // var requested_map_url = 'http://services.commonscloud.org/maps/live?' + geography_param

  var requested_map_url = 'http://www.google.com/';

  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.open(requested_map_url, function(status) {
        console.log('Opened site? %s', status);
        page.evaluate(
          function (status) {
            console.log('status', status);
          },
          function (result) {
            console.log('result', result);
            ph.exit();
          });
      });
    });
  });

  response.ren
});

/* GET home page. */
router.get('/live', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  response.render('maps.html', { __geojson__: geography_param});
});

module.exports = router;
