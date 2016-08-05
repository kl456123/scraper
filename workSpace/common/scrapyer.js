 import Handler from './handler.js';
 import exportObj from '../../utils/utils.js';

 let proRequest = exportObj.proRequest;

 let handler = new Handler();

 // es6 format

 let log4js = require('log4js');
 let writeFile = require('../../utils/ioUtils.js').writeFile;
 // let defaultConfig = require('../../conf/default.js');
 import defaultConfig from '../../conf/default.js';
 let options = require('../../data/headers/options.js');
 let options_get = options.options_get;

 let Queue = require('./message.js');
 let queue = new Queue();
 // get all urls from one webpage
 let getURL = require('../Images/getURL.js').getURL;
 const cluster = require('cluster');
 const numCPUs = require('os').cpus().length;

 class Scrapyer {
   constructor(options) {
     //default configuration
     Object.assign(this, defaultConfig);
     this.queue = queue;

     // options used for initial Scrapyer
     if (typeof options === 'object') {

       Object.assign(this, options);
       this.options = options;
       // All url must be into queue!
       if (options.url) {
         this.queue.push(options.url);
       }

     } else if (typeof options === 'string') {
       let name = options;
       this.name = name;
     }

     /*    else {

           throw new Error('options must be object or string');
         }*/
     this.logger = log4js.getLogger(this.name); //logger
     this.logger.setLevel(this.loggerLevel);

     // handler success from scrapyer

     handler.setRecurrent(this.recurrent);
   }



   start(callback) {
     let that = this;
     // check if it can start first
     if (that.url === undefined) {
       that.looger.fatal('can not scrapy due to no url');
       throw new Error('url is undefined,please set url fisrt');
     }
     if (that.selector === undefined) {
       that.looger.fatal('can not scrapy due to no selector');
       throw new Error('selector is undeined,please set it first');
     }

     // log all configuration
     that.inform();


     // master process to deal with queue
     this.masterProcess(that);

     // slave process to deal with preurl
     this.slaveProcess(that, this.urlSelector, callback);
   }


   // set functions
   seturl(url) {
     // check url format
     this.url = url;
     if (this.options) {
       this.options.url = url;
     }
     this.queue.push(url);

   }

   setNotText() {
     this.isText = 0;

     // set handler isText
     handler.setIsText(0);
   }

   setUrlSelector(urlSelector) {
     this.urlSelector = urlSelector;
   }

   setSelector(selector) {
     // check ....
     this.selector = selector;

     // at the same time set handler selector
     handler.setSelector(selector);
   }
   setIsDownloadPage(flag) {
     this.isDownloadPage = flag;

   }
   setRecurrent(flag) {
     this.recurrent = flag;
     handler.setRecurrent(this.recurrent);
   }

   setDownloadPagePath(path) {
     this.downloadPagePath = path;

   }

   setLoggerLevel(level) {
     this.loggerLevel = level;
     this.logger.setLevel(level);

   }

   // set chraset such as UTF-8 or GBK or ACSII
   setChraset(chraset) {
     this.chraset = chraset;
   }

   /*var http = require('http');
   http.createServer(function)*/

   initial() {
     if (this.HEAD) {
       if (this.options === undefined) {
         this.options = options_get;
       } else {
         Object.assign(this.options, options_get);
       }
     }
   }


   //download webpage into /data/html/
   _downloadPage(filename, page) {
       if (this.isDownloadPage) {
         writeFile(this.downloadPagePath + filename + '.html', page)
           .then(function() {

             this.logger.info('download webpage success');
           })
           .catch(function(err) {

             throw err;
           });
       }
     }
     // display all configurations
   inform() {
     if (!cluster.isMaster) {
       return;
     }

     this.logger.info('set isText: ' + this.isText);
     this.logger.info('set url: ' + this.url);
     this.logger.info('set it download page: ' + this.isDownloadPage);
     this.logger.info('set recurrent: ' + this.recurrent);
     this.logger.info('set it logger level: ' + this.loggerLevel);
     this.logger.info('set it downloadPage path: ' + this.downloadPagePath);
     if (typeof this.selector === 'string') {
       this.logger.info('set selector: ' + this.selector);
     } else {
       let tmp = '';
       this.selector.forEach(function(one) {
         tmp += one;
         tmp += '\n';
       });
       this.logger.info('set selector: ' + tmp);
     }

     // start
     this.logger.trace('scrapyer start working');

   }


   // _enableRecurrent(url, urlSelector) {
   //   /*this.logger.info('The number of urls is ' + this.queue.getLength());*/
   //   if (!this.recurrent) {
   //     return;
   //   }
   //   if (urlSelector === undefined) {
   //     this.logger.fatal('urlSelector is undefined');
   //     throw new Error('urlSelector is undefined');
   //     return;
   //   }
   //   // let tmp = this.options||this.url;
   //   let tmp = url;
   //   // get urls from webpage
   //   getURL(tmp, urlSelector)
   //     .then(function(urls) {
   //       if (urls.length === 0) {
   //         this.logger.warn('No urls for uesing');
   //         return;
   //       }
   //       // console.log(urls.length);
   //       this.queue.pushAllFilter(urls);
   //     })
   //     .catch(function(err) {
   //       this.fatal(err);
   //     });
   // }

   slaveProcess(that, urlSelector, callback) {

     // it is better to use 'this' not 'that',but sth wrong with it
     let geturlWorker = cluster.worker;
     if (cluster.isWorker) {
       process.on('message', function(url) {
         that.logger.info('slaveProcess(' + geturlWorker.id + ') get url from masterProcess');

         if (url === undefined) {
           that.logger.warn('url from masterProcess is undefined,please check urls in queue');
           return;
         }



         let tmp = that.options || that.url;

         if (typeof tmp === 'object') {
           tmp.url = url;
         } else {
           tmp = url;
         }
         proRequest(tmp)
           .then(function(retobj) {
             let page = retobj[0];
             let requrl = retobj[1];

             /*             handler(page, that.selector, requrl, that.isText, that.recurrent);*/

             handler.handle(page, requrl);
             // plugins functions

             that._downloadPage(that.filename, page);

             if (callback) {
               callback(null, page);
             }
           })
           .catch(function(err) {
             if (callback) {
               callback(err, null);
             }
           });

         if (!that.recurrent) {
           return;
         }

         that.logger.debug('recurrent');
         // just url at present
         that.logger.debug(urlSelector);

         getURL(tmp, urlSelector)
           .then(function(urls) {
             if (urls.length === 0 || urls === undefined) {
               that.logger.warn('urls is undefined or empty,please change urlSelector');
             }
             that.logger.debug('urls in slave process: ' + urls.length);
             // console.log(urls[0]);
             process.send(urls);
           })
           .catch(function(err) {
             // send error to master process
             process.send('error');
             that.logger.fatal(err);
           });
       });
     }
   }

   masterProcess(that) {
     // master process
     if (cluster.isMaster) {
       // if not empty fork a slave process
       if (!that.queue.isEmpty()) {
         let worker = cluster.fork();
         let front = queue.pop();
         worker.send(front);
       }

       // listen to slaveProcess
       Object.keys(cluster.workers).forEach(function(id) {
         cluster.workers[id].on('message', function(msg) {
           that.logger.info('one epoch start, ' + that.queue.getLength() + ' urls left');
           // if msg is not error ,receive all url into queue
           if (msg === 'error') {
             that.logger.warn('url in slave process is not useful');
           } else {
             that.queue.pushAllFilter(msg);
           }

           // if empty ,process exit
           if (that.queue.isEmpty()) {
             that.logger.info('no url for using');
             // cluster.workers[id].send('empty');
             // process.exit();
             return;
           }

           // send url to slave process
           let preurl = that.queue.pop();
           cluster.workers[id].send(preurl);

         });
       });

     }
   }



 }

 export default Scrapyer;