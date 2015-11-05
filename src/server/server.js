var express = require('express');
var serveStatic = require('serve-static');
var compression = require('compression');
var fs = require('fs');
var mime = require('mime-types');
var transcoder = require('stream-transcoder');
var app = express();
app.use(compression());
const = MP4_MIME = 'video/mp4';
/**
 * Levanta un servidor de express
 * al vuelo para servir un archivo
 * local mediante stream en la ruta
 * http://localhost:3000/video
 * @param filePath ruta absoluta al archivo
 * @author Jesus Perales.
 * 04/11/2015
 */
module.exports = function(filePath){
  fileMime = mime.lookup(filePath);
  console.log(fileMime);
  app.get('/video', function(req, res){
    if(MP4_MIME === fileMime){
      var stat = fs.statSync(filePath);
         res.writeHead(200, {
             'Content-Type': fileMime,
             'Content-Length': stat.size
        });

      var stream = fs.createReadStream(filePath, { bufferSize: 64 * 1024 });
      stream.pipe(res);
      stream.on('data',function(chunk){
        console.log('enviando...');
      });
    }else{
      // TODO: Transcode debe ir aqui
      var trans = new transcoder(filePath)
      .videoCodec('h264')
      .format('mp4')
      .custom('strict', 'experimental')
      .on('finish', function() {
        debug('finished transcoding');
      })
      .on('error', function(err) {
        debug('transcoding error: %o', err);
      });
      trans.stream().pipe(res);
    }
  });

  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });
};
