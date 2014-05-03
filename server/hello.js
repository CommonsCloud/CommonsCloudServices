var page = require('webpage').create();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return s4() + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + s4() + s4();
}

var uuid = guid();

page.viewportSize = { width: 600, height: 800 };
page.open('http://services.commonscloud.org/maps/live?geography={%22type%22:%22FeatureCollection%22,%22properties%22:{%22tileLayer%22:%22satellite%22},%22features%22:[{%22type%22:%22Feature%22,%22properties%22:{%22style%22:{%22stroke%22:true,%22fill%22:false,%22weight%22:3,%22opacity%22:1,%22color%22:%22rgb(255,255,255)%22,%22lineCap%22:%22square%22,%22dashArray%22:%226%22}},%22geometry%22:{%22type%22:%22Polygon%22,%22coordinates%22:[[[-79.80994194746017,40.47706812086002],[-79.80970054864883,40.4776761170077],[-79.81071442365646,40.4777597670535],[-79.81098264455795,40.47723134184301],[-79.80994194746017,40.47706812086002]]]},%22area%22:1.43},{%22type%22:%22Feature%22,%22properties%22:{%22style%22:{%22stroke%22:true,%22fill%22:true,%22fillColor%22:%22rgb(23,%20207,%20207)%22,%22fillOpacity%22:0.85,%22weight%22:4,%22opacity%22:1,%22color%22:%22rgb(23,%20207,%20207)%22,%22lineCap%22:%22square%22,%22dashArray%22:%220%22}},%22geometry%22:{%22type%22:%22Polygon%22,%22coordinates%22:[[[-79.81080830097198,40.47839019941192],[-79.80973005294798,40.478382038513075],[-79.80989098548888,40.47790462420338],[-79.81093704700469,40.4778964632455],[-79.81080830097198,40.47839019941192]]]},%22area%22:52330,%22layerID%22:32,%22label%22:%22Asdf%22,%22geoType%22:{%22name%22:%22buffer%22,%22description%22:%22Riparian%20Buffer%22,%22coefficient%22:0.1},%22prevType%22:{%22name%22:%22building%22,%22description%22:%22Building%22,%22coefficient%22:0.9}},{%22type%22:%22Feature%22,%22properties%22:{%22style%22:{%22stroke%22:true,%22fill%22:true,%22fillColor%22:%22rgb(23,%20207,%20207)%22,%22fillOpacity%22:0.85,%22weight%22:4,%22opacity%22:1,%22color%22:%22rgb(23,%20207,%20207)%22,%22lineCap%22:%22square%22,%22dashArray%22:%220%22}},%22geometry%22:{%22type%22:%22Polygon%22,%22coordinates%22:[[[-79.81080830097198,40.47839019941192],[-79.80973005294798,40.478382038513075],[-79.80989098548888,40.47790462420338],[-79.81093704700469,40.4778964632455],[-79.81080830097198,40.47839019941192]]]},%22area%22:52330,%22layerID%22:36,%22label%22:%22Asdf%22,%22geoType%22:{%22name%22:%22buffer%22,%22description%22:%22Riparian%20Buffer%22,%22coefficient%22:0.1},%22prevType%22:{%22name%22:%22building%22,%22description%22:%22Building%22,%22coefficient%22:0.9}}]}', function() {

  setTimeout(function() {
    page.render('public/map_' + uuid + '.png');
    console.log('http://services.commonscloud.org/map_' + uuid + '.png' );
    phantom.exit();
  }, 2000);

});
