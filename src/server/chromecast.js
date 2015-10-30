var chromecastjs = require('chromecast-js');
var browser = new chromecastjs.Browser();
var server = require('./express');

module.exports = function(){

  browser.on('deviceOn', function(device){
    device.connect();

    device.on('connected', function(){

      server();

      device.play('http://192.168.1.95:3000/av.avi', 60, function(){
          console.log('Playing in your chromecast!')
      });

    })
  });

};
