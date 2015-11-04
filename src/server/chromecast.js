var chromecastjs = require('chromecast-js');
var browser = new chromecastjs.Browser();
var server = require('./server');
var path = require('path');
var os = require('os');

/**
 * Busca un chromecast en la red
 * y se conecta con el para enviar
 * un archivo local.
 * @param file ruta absoluta al archivo.
 * @author Jesus Perales.
 * 04/11/2015
 */
function play(file){
  console.log(file);
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
}

/**
 * Obtiene la primera ip que se encuentra
 * en la maquina local.
 * @returns ip de la maquina.
 * @author Jesus Perales.
 * 04/11/2015
 */
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

module.exports = play;
