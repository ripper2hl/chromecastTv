var chromecastjs = require('chromecast-js');
var browser = new chromecastjs.Browser();
var server = require('./server');
var path = require('path');
var os = require('os');

module.exports = function(file){
  browser.on('deviceOn', function(device){
    device.connect();
    device.on('connected', function(){
      var ip = getIp();
      server(file);
      var url = 'http://' + ip + ':3000/video';
      console.log(url);
      device.play(url, 0, function(){
        console.log('Playing in your chromecast!')
      });

    })
  });
};

function getIp(){
  var interfaces = os.networkInterfaces();
  var addresses;
  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
              addresses = address.address;
              break;
          }
      }
      if(addresses){
        break;
      }
  }
  return addresses;
}
