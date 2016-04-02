const cluster = require('cluster');
const http = require('http');


if (cluster.isMaster) {

  // keep track of http requests.

  var numReqs = 0;
  setInterval(function() {
    console.log('numReqs =', numReqs);
  }, 1000);

  // Count requests

  var messageHandle = function(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  };

  const numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    cluster.workers[id].on('message', messageHandle);
  });
} else {
  // worker process have a http server.

  http.Server(function(req, res) {
    res.writeHead(200);
    res.end('hello world\n');

    // notify master about the request
    //
    process.send({
      cmd: 'notifyRequest'
    });
  }).listen(8000);
}