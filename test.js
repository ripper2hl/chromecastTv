var express = require('express')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic('/home/perales/test/'))
app.listen(3000);
