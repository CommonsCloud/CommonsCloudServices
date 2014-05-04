var page = require('webpage').create();
var system = require('system');

console.log('started generating from phantomjs');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return s4() + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + s4() + s4();
}

var postBody = 'geography=' + JSON.stringify(system.args[2]);

page.viewportSize = { width: 532, height: 712 };
page.open(system.args[1], 'POST', postBody, function(status) {

    console.log(status);


  // var uuid = guid();
  // var extension = 'png';

  // setTimeout(function() {
  //   page.render('public/map_' + uuid + '.' + extension);

  //   var generated_image = 'http://services.commonscloud.org/map_' + uuid + '.' + extension;
  //   console.log(generated_image);

  //   phantom.exit();
  // }, 2000);

});
