import {
  spop,
  sadd,
  fetch,
  fetchInTime,
  initRedis,
  checkRedis
} from './redis.js';
import {
  newScrapyer,
  workScrapyer
} from './newScrapyer.js';

import redis from 'redis';
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
let url = 'http://www.baidu.com/';
let setName = 'urls';
let urls = ['http://www.baidu.com/', 'http://www.zhihu.com/'];
let client = redis.createClient();
// console.log(numCPUs);
/*sadd(client, setName, urls)
  .then(function(len) {
    console.log(len);
  })
  .catch(function(err) {
    console.log(err);
  })
  .then(function() {
    client.quit();
  });*/
/*newScrapyer(client, setName, url)
  .then(function() {
    // client.quit();
  })
  .catch(function(err) {
    client.quit();
    console.log(err.stack);
  });*/

workScrapyer(client, setName, url)
  .then(function() {
    console.log('asfasfasasgasgasgasgagasg\n');
    // client.quit();
  })
  .catch(function(err) {
    // initRedis();
    client.quit();
    console.log(err.stack);
  });

/*fetchInTime(client, setName, 5000)
  .then(function() {
    console.log('success');
  })
  .catch(function(err) {
    console.log(err.stack);
  })
  .then(function() {
    client.quit();
  });*/


// if (cluster.isMaster) {
// let client = redis.createClient();

// first check redis
/*checkRedis(client, setName, numCPUs)
  .then(function(len) {
    console.log(len);
    console.log('success');
  })
  .catch(function(err) {
    console.log(err.stack);
    initRedis(client, setName, url);
  })
  // .then(function() {
  //   // fork max number of processes
  //   for (let i = 0; i < 4; i++) {
  //     cluster.fork();
  //   }
  // })
  .catch(function(err) {
    console.log(err.stack);
  });*/
// restart worker if it meet except error
// } else if (cluster.isWorker) {
/*let client = redis.createClient();

workScrapyer(client, setName)
  .then(function() {
    // client.quit();
  })
  .catch(function(err) {
    console.log(err.stack);
    client.quit();
    // cluster.worker.exit();
  });*/
// }
//
async function master(client, setName, numCPUs) {
  let len;
  try {
    len = await checkRedis(client, setName, numCPUs);
  } catch (err) {
    console.log(err);
    len = await initRedis(client, setName, url, 'a', 8);
  }
  return len;
}

/*master(client, setName, numCPUs)
  .then(function(len) {
    console.log(len);
    client.quit();
  })
  .catch(function(err) {
    client.quit();
    console.log(err);
  });*/

// console.log(numCPUs);
function demo(x, y = 1, z = 10) {
  console.log(y);
  console.log(z);
}

// demo(1, 3);
/*let e = new Error('asfaf');
console.log(e.message);*/