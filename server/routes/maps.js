var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(request, response) {

  var url_parts = url.parse(request.url, true);

  var query = url_parts.query['geography'];;

  response.render('maps', { title: 'Asked for ' + query});
});

module.exports = router;
