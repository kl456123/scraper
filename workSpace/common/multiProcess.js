const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

var Queue = require('./message.js');
var queue = new Queue();
var getURL = require('../Images/getURL.js').getURL;
var handleUrl = require('../../utils/utils.js').handleUrl;

// init queue
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



if (cluster.isMaster) {

  //  var messageHandler = function(msg) {
  //   queue.pushAll(msg);

  // };

  for (var i = 0; i < numCPUs; i++) {
    var worker = cluster.fork();
    // worker.on('message', function(msg) {
    //   queue.pushAll(msg);
    var url = queue.pop();
    // console.log(url);
    // console.log(queue.getLength());
    worker.send(url);
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
        cluster.workers[id].send(queue.pop());
        return;
      }
      queue.pushAll(msg);
      cluster.workers[id].send(queue.pop());
    });
  });

} else {
  process.on('message', function(url) {

    console.log(cluster.worker.id + ':' + url);
    if (!url) {
      return;
    }
    getURL(url)
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