import {
  workScrapyer,
  masterScrapyer
} from './newScrapyer.js';
import redis from 'redis';
import {
  checkRedis,
  initRedis
} from './redis.js';
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

let url = 'http://www.baidu.com/';

let setName = 'urls';

if (cluster.isMaster) {
  let client = redis.createClient();

  // first check redis
  masterScrapyer(client, setName, url, numCPUs)
    .then(function(len) {
      // fork max number of processes
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      console.log(len);
    })
    .catch(function(err) {
      console.log(err.stack);

      client.quit();
      process.exit();
    });

  // restart worker if it meet except error
  cluster.on('exit', (worker, code, signal) => {
    console.log('worker %d died (%s). restarting...',
      worker.process.pid, signal || code);
    cluster.fork();
  });

} else if (cluster.isWorker) {
  let client = redis.createClient();

  workScrapyer(client, setName)
    .then(function() {
      // client.quit();
    })
    .catch(function(err) {
      console.log(err.stack);
      client.quit();
      process.exit();
    });
}


/*if (cluster.isMaster) {
  // let client = redis.createClient();

  // fork max number of processes
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }
  // client.quit();

} else {
  let client = redis.createClient();
  workScrapyer(client, setName)
    .catch(function(err) {
      console.log(err.stack);
      client.quit();
      cluster.worker.exit();
    });
}*/