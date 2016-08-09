import redis from 'redis';
import {
  getURL
} from '../Images/getURL.js';


function sadd(client, setName, urls) {

  return new Promise(function(resolve, reject) {
    // let client = redis.createClient();
    if (!(urls instanceof String || urls instanceof Array)) {
      reject(new Error('urls is not legal'));
      // client.quit();
      return;
    }

    client.sadd(setName, urls, function(err, res) {
      if (err) {
        reject(err);
        // client.quit();
        return;
      }
      client.scard(setName, function(err, len) {
        resolve(len);
        // client.quit();
      });
    });
  });
}

function spop(client, setName) {

  return new Promise(function(resolve, reject) {
    // let client = redis.createClient();
    client.spop(setName, function(err, url) {
      if (err) {
        reject(err);
        return;
      }
      resolve(url);

    });
    // client.quit();
    // });

  });
}

function inTime(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error('Timeout!'));
    }, time);
  });
}

async function fetch(client, setName) {
  // await url = spop(client,setName);
  let url = null;
  while (url == null) {
    url = await spop(client, setName);
  }
  return url;
}

function fetchInTime(client, setName, time) {
  return Promise.race([fetch(client, setName), inTime(time)]);
}


function scard(client, setName) {

  return new Promise(function(resolve, reject) {

    client.scard(setName, function(err, len) {
      if (err) {
        reject(err);
        return;
      }
      resolve(len);
      // client.quit();
    });
  });
}


async function checkRedis(client, setName, numCPUs) {
  let len = await scard(client, setName);
  // console.log('numCPUs: ' + numCPUs);
  if (len < numCPUs) {
    // console.log('asfasfaf0');
    throw new Error('urls in redis is too few');
  }

  return len;
}

// deal with problems raised by checkRedis
async function initRedis(client, setName, url, urlSelector, numCPUs) {
  // console.log('urlSelector: ' + urlSelector + '\n');
  let urls = await getURL(url, urlSelector);
  let len = await sadd(client, setName, urls);
  if (len < numCPUs) {
    throw new Error('the only url is usefulless');
  }
  return len;
}


export {
  sadd,
  spop,
  scard,
  checkRedis,
  initRedis,
  fetch,
  fetchInTime,
  inTime
};


// for testing due to not running mocha in it.
// sadd('urls', ['hsadfs', 'asfasfa'])
//   .then(function(res) {

//   })
//   .catch(function(err) {
//     console.log(err.stack);
//   });