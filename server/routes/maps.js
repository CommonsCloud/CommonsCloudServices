var express = require('express');
var router = express.Router();
var url = require('url');
var Spooky = require('spooky');

/* GET home page. */
router.get('/', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  var requested_map_url = 'http://services.commonscloud.org/maps/live?' + geography_param

  var spooky = new Spooky({
      casper: {
         logLevel: 'error',
         verbose: false
      }
    }, function (err) {
    // NODE CONTEXT
    console.log('We are in the Node context');
    spooky.start(requested_map_url);
    spooky.then(function() {
      // CASPERJS CONTEXT
      console.log('We are in the CasperJS context');
      this.emit('console', 'We can also emit events here.');
    });
    spooky.then(function() {
      // CASPERJS CONTEXT
      var size = this.evaluate(function() {
        // PAGE CONTEXT
        console.log('....'); // DOES NOT GET PRINTED OUT
        __utils__.echo('We are in the Page context'); // Gets printed out
        this.capture('screenshot.png');
      });
    });
  });

});

/* GET home page. */
router.get('/live', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var geography_param = url_parts.query['geography'];

  response.render('maps.html', { __geojson__: geography_param});
});

module.exports = router;
