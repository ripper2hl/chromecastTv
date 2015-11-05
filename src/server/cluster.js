var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var server = require('./server');

module.exports = function(filePath){
  if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

     Object.keys(cluster.workers).forEach(function(id) {
      console.log("I am running with ID : "+cluster.workers[id].process.pid);
    });

    cluster.on('exit', function(worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
    });
  } else {
    server(filePath);
  }
};
