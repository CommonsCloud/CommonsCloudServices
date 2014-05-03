var page = require('webpage').create();
var system = require('system');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return s4() + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + s4() + s4();
}

var uuid = guid();
var request_url = 

page.viewportSize = { width: 600, height: 800 };
page.open(system.args[1], function() {

  setTimeout(function() {
    page.render('public/map_' + uuid + '.png');
    phantom.exit();

    var generated_image = 'http://services.commonscloud.org/map_' + uuid + '.png';
    console.log(generated_image);

    return true;
  }, 2000);

});
