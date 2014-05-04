var page = require('webpage').create();
var system = require('system');

var url = system.args[1];
var data = 'geography=' + system.args[2];

var s4 = function() {
  return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
};

var guid = function() {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};

var callback = function(status) {

  var uuid = guid();

  setTimeout(function() {
    page.render('public/map_' + uuid + '.png');

    var image_url = 'http://services.commonscloud.org/map_' + uuid + '.png';
    console.log(image_url);

    phantom.exit();
  }, 2000);

};

page.viewportSize = { width: 532, height: 532 };
page.open(url, 'POST', data, callback);
