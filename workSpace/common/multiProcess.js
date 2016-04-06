const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

var Queue = require('./message.js');
var queue = new Queue();
var getURL = require('../Images/getURL.js').getURL;
var handleUrl = require('../../utils/utils.js').handleUrl;
var BloomFilter = require('bloomfilter').BloomFilter;
var proRequest = require('../../utils/utils.js').proRequest;

// init queue
//
// because I have eight cpu cores for matching eight urls
//
// I will deal the problem to improve it.
// then I can delete the following urls.
var urlsrc = 'http://xiaohua.zol.com.cn/';
queue.push(urlsrc);
urlsrc = 'http://joke.876.tw/';
queue.push(urlsrc);
urlsrc = 'http://joke.876.tw/show/5/51624.shtml';
queue.push(urlsrc);
urlsrc = 'http://joke.876.tw/show/5/51620.shtml';
queue.push(urlsrc);
urlsrc = 'http://joke.876.tw/show/3/51616.shtml';
queue.push(urlsrc);
urlsrc = 'http://joke.876.tw/show/9/51614.shtml';
queue.push(urlsrc);
urlsrc = 'http://joke.876.tw/show/2/51602.shtml';
queue.push(urlsrc);
urlsrc = 'http://joke.876.tw/show/1/51350.shtml';
queue.push(urlsrc);


function multiScrapy(handler, urlSelector, selector) {

  if (cluster.isMaster) {

    //  var messageHandler = function(msg) {
    //   queue.pushAll(msg);

    // };
    // bloom filter arguments must be considerate then!
    var bloom = new BloomFilter(
      32 * 256,
      16
    );
    for (var i = 0; i < numCPUs; i++) {
      var worker = cluster.fork();

      var _url = queue.pop();

      worker.send(_url);
      // });
    }
    // setTimeout(function() {
    //   for (var i = 0; i < numCPUs - 2; i++) {
    //     worker = cluster.fork();

    //     url = queue.pop();

    //     worker.send(url);
    //     // });
    //   }
    // }, 2000);

    setInterval(function() {
      console.log('numReqs =', queue.getLength());
      // console.log(queue.data[10]);
    }, 1000);



    Object.keys(cluster.workers).forEach(function(id) {
      cluster.workers[id].on('message', function(msg) {
        if (msg === 'error') {
          var _url = queue.pop();
          bloom.add(_url);
          cluster.workers[id].send(_url);

          return;
        }
        // queue.pushAll(msg);
        // bloom filter url , just push one url that are not in the queue.
        msg.forEach(function(one) {
          if (!bloom.test(one)) {
            queue.push(one);
          }
        });
        cluster.workers[id].send(queue.pop());
      });
    });

  } else {
    process.on('message', function(url) {

      console.log(cluster.worker.id + ':' + url);
      if (!url) {
        return;
      }
      if (handler !== undefined) {
        proRequest(url)
          .then(function([page, requrl]) {
            handler(page, selector, requrl);
          })
          .catch(function(err) {
            console.log(err);
          });
        // handler(selector);
      }

      getURL(url, urlSelector)
        .then(function(urls) {
          // console.log(urls);
          if (urls.length !== 0) {
            process.send(urls);
          }

        })
        .catch(function(err) {
          if (err) {
            console.log(err);
          }
          process.send('error');
        });
    });

  }
}


module.exports = multiScrapy;
// multiScripy();