var express = require('express');
var app = express();
var serveStatic = require('serve-static');

module.exports = function(){

  app.use(serveStatic('/home/perales/test/'));

  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });
}