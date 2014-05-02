var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geojson = url_parts.query['geography'];;

  response.render('maps.html', { __geojson__: decodeURIComponent(geojson)});
});

module.exports = router;
