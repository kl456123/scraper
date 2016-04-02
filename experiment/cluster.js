const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


if (cluster.isMaster) {
  // fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log('worker ${worker.process.pid} died');
  });

} else {
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);
}