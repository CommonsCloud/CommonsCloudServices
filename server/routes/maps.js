var express = require('express');
var router = express.Router();
var url = require('url');
var Spooky = require('spooky');

/* GET home page. */
router.get('/', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  // var requested_map_url = 'http://services.commonscloud.org/maps/live?';
  var requested_map_url = 'http://www.chesapeakecommons.org';

  console.log('requested_map_url', requested_map_url);

  var spooky = new Spooky({
      child: {
        transport: 'http'
      },
      casper: {
        logLevel: 'debug',
        verbose: true
      }
    });

  spooky.on('error', function (e, stack) {
      console.error(e);

      if (stack) {
          console.log(stack);
      }
  });

  spooky.on('console', function (line) {
    console.log(line);
  });

  spooky.on('hello', function (greeting) {
      console.log(greeting);
  });

  spooky.on('log', function (log) {
      if (log.space === 'remote') {
          console.log(log.message.replace(/ \- .*/, ''));
      }
  });

  // response.render('maps.html', { __geojson__: geography_param});

});

/* GET home page. */
router.get('/live', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  response.render('maps.html', { __geojson__: geography_param});
});

module.exports = router;
