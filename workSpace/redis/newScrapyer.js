import {
  spop,
  sadd,
  checkRedis,
  initRedis,
  fetchInTime
} from './redis.js';
import requestPro from '../common/requestPro.js';
import {
  options_get
} from '../../data/headers/options.js';

import Handler from '../common/handler.js';
import {
  getURL
} from '../Images/getURL.js';
import redis from 'redis';
let url = 'http://www.zhihu.com/';

let urlSelector = 'a';
let setName = 'urls';
let time = 5000;
let handler = new Handler();
handler.setIsText(1);
handler.setSelector('a');

// recrute at tail
async function newScrapyer(client, setName, url) {
  if (url == null) return;

  // options_get.url = url;
  let data = await requestPro(url);
  handler.handle(data, url);
  let urls = await getURL(url, urlSelector);
  sadd(client, setName, urls)
    .then(function(len) {
      console.log('number of members in set : ' + len);
    });
  let newurl = await spop(client, setName);
  newScrapyer(client, setName, newurl);
}

/*newScrapyer(setName,url)
  .then(function() {
    console.log('scrapyer finish its work!');
  })
  .catch(function(err) {
    console.log(err.stack);
  });*/

async function workScrapyer(client, setName) {

  /*  let url = await spop(client, setName);
    if (url == null) {
      throw new Error('no url in redis');
    }*/
  let url = await fetchInTime(client, setName, time);

  await newScrapyer(client, setName, url);

}


async function masterScrapyer(client, setName, url, numCPUs) {
  let len;
  try {
    len = await checkRedis(client, setName, numCPUs);
  } catch (err) {
    console.log(err.message);
    console.log('So initial redis first');
    len = await initRedis(client, setName, url, 'a', numCPUs);
  }
  return len;
}

export {
  newScrapyer,
  workScrapyer,
  masterScrapyer
};