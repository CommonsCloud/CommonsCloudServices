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

system.args.forEach(function(arg, i) {
      console.log(i + ': ' + arg);
});


page.viewportSize = { width: 600, height: 800 };
page.open(system.args[1], function() {

  setTimeout(function() {
    page.render('public/map_' + uuid + '.png');
    console.log('http://services.commonscloud.org/map_' + uuid + '.png' );
    phantom.exit();
  }, 2000);

});
