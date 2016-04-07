const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

var Queue = require('./message.js');
var queue = new Queue();
var getURL = require('../Images/getURL.js').getURL;
var handleUrl = require('../../utils/utils.js').handleUrl;
var BloomFilter = require('bloomfilter').BloomFilter;
var proRequest = require('../../utils/utils.js').proRequest;
var scrapy = require('./scrapy.js');

var options = require('../../data/headers/options.js');
var options_get = options.options_get1;
// init queue
//
// because I have eight cpu cores for matching eight urls
//
// I will deal the problem to improve it.
// then I can delete the following urls.
var urlsrc = 'http://www.kuaidaili.com/proxylist/1/';
queue.push(urlsrc);
// urlsrc = 'http://joke.876.tw/';
// queue.push(urlsrc);
// urlsrc = 'http://joke.876.tw/show/5/51624.shtml';
// queue.push(urlsrc);
// urlsrc = 'http://joke.876.tw/show/5/51620.shtml';
// queue.push(urlsrc);
// urlsrc = 'http://joke.876.tw/show/3/51616.shtml';
// queue.push(urlsrc);
// urlsrc = 'http://joke.876.tw/show/9/51614.shtml';
// queue.push(urlsrc);
// urlsrc = 'http://joke.876.tw/show/2/51602.shtml';
// queue.push(urlsrc);
// urlsrc = 'http://joke.876.tw/show/1/51350.shtml';
// queue.push(urlsrc);


function multiScrapy(urlSelector, selector, isText) {

  if (cluster.isMaster) {

    //  var messageHandler = function(msg) {
    //   queue.pushAll(msg);

    // };
    // bloom filter arguments must be considerate then!
    var bloom = new BloomFilter(
      32 * 256,
      16
    );

    // first start a process toget url
    //  from message queue.
    if (!queue.isEmpty()) {
      var worker = cluster.fork();

      var _url = queue.pop();

      worker.send(_url);

    }

    var delay = 5000;

    // setTimeout(function() {
    //   for (var i = 0; i < numCPUs - 1; i++) {
    //     worker = cluster.fork();

    //     _url = queue.pop();

    //     worker.send(_url);

    //   }

    //   for (var id = 1; id < numCPUs; id++) {
    //     masterReact(id);
    //   }
    // }, delay);


    // setInterval(function() {
    //   console.log('numReqs =', queue.getLength());
    //   // console.log(queue.data[10]);
    // }, 1000);



    Object.keys(cluster.workers).forEach(function(id) {
      masterReact(id);
    });

    function masterReact(id) {
      cluster.workers[id].on('message', function(msg) {

        if (msg === 'error') {
          if (queue.isEmpty()) {
            console.log('no url for using');
            return;
          }
          var _url = queue.pop();
          bloom.add(_url);
          cluster.workers[id].send(_url);

          return;
        }
        // queue.pushAll(msg);
        // bloom filter url , just push one url that are not in the queue.
        msg.forEach(function(one) {
          // console.log(bloom.test(one));
          if (!bloom.test(one)) {
            bloom.add(one);
            queue.push(one);
          }
        });
        // if (queue.isEmpty()) {
        //   console.log('no url for using');
        //   return;
        // }
        // console.log(queue.isEmpty());
        var temp = queue.pop();
        if (temp === undefined) {
          process.exit();
          return;
        }
        cluster.workers[id].send(temp);
      });
    }

  } else {
    process.on('message', function(url) {

      console.log(cluster.worker.id + ':' + url);
      if (!url) {
        return;
      }
      options_get.url = url;
      // if (handler !== undefined) {

      //   proRequest(options_get)
      //     .then(function(obj) {
      //       var page = obj[0];
      //       var requrl = obj[1];
      //       // console.log(page);
      //       handler(page, selector, requrl);
      //     })
      //     .catch(function(err) {
      //       console.log(err);
      //     });
      //   // handler(selector);
      // }
      scrapy(url, selector, isText);

      getURL(options_get, urlSelector)
        .then(function(urls) {
          // console.log(urls);
          // if (urls === undefined) {
          //   process.send('error');
          //   return;
          // }
          // console.log(urls);
          process.send(urls);
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
// multiScrapy();