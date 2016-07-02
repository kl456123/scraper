var handler = require('./handler.js');
var exportObj = require('../../utils/utils.js');

var proRequest = exportObj.proRequest;



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



class Scrapyer {
  constructor(options) {
    //default configuration
    Object.assign(this, defaultConfig);
    this.queue = queue;
    // this.isText = 1;
    // this.delay = 0;
    // this.isDownloadPage = 0;
    // this.loggerLevel = 'ALL';
    // this.downloadPath = '../../data/';
    /*default filename is demo, you can change it*/
    // this.filename = 'demo';
    this.selector = [];
    // options used for initial Scrapyer
    if (typeof options === 'object') {

      Object.assign(this, options);
      this.options = options;
      // All url must be into queue!
      if (options.url) {
        queue.push(options.url);
      }

    } else if (typeof options === 'string') {
      let name = options;

      this.name = name;


    }
    /*    else {

          throw new Error('options must be object or string');
        }*/
    this.logger = log4js.getLogger(this.name); //logger
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

    that.logger.trace('scrapyer start working');

    let tmp = that.options || that.url;
    let nowurl = '';
    while (!queue.isEmpty()) {
      nowurl = queue.pop();

      if (typeof tmp === 'object') {
        tmp.url = nowurl;
      } else {
        tmp = nowurl;
      }
      proRequest(tmp)
        .then(function(retobj) {
          let page = retobj[0];
          let requrl = retobj[1];
          handler(page, that.selector, requrl, that.isText);

          // plugins functions
          that._enableRecurrent(nowurl, that.urlSelector);
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
    }



  }


  // set functions
  seturl(url) {
    // check url format
    this.url = url;
    if (this.options) {
      this.options.url = url;
    }
    this.queue.push(url);
    this.logger.info('set url: ' + this.url);
  }

  setNotText() {
    this.isText = 0;
    this.logger.info('set isText: 0');
  }

  setSelector(selector) {
    // check ....
    this.selector = selector;
    this.logger.info('set selector');
  }
  setIsDownloadPage(flag) {
    this.isDownloadPage = flag;
    this.logger.info('set it download page:ON');
  }

  setDownloadPath(path) {
    this.downloadPath = path;
    this.logger.info('set it download path: ' + this.downloadPath);
  }
  setLoggerLevel(level) {
    this.loggerLevel = level;
    this.logger.setLevel(level);
    this.logger.info('set it logger level: ' + this.level);
  }

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
      writeFile(this.downloadPath + 'html/' + filename + '.html', page)
        .then(function() {

          this.logger.info('download webpage success');
        })
        .catch(function(err) {

          throw err;
        });
    }
  }

  saveDownloadObj() {

  }

  _enableRecurrent(url, urlSelector) {
    if (!this.recurrent) {
      return;
    }
    if (urlSelector === undefined) {
      this.logger.fatal('urlSelector is undefined');
      throw new Error('urlSelector is undefined');
      return;
    }
    // let tmp = this.options||this.url;
    let tmp = url;
    // get urls from webpage
    getURL(tmp, urlSelector)
      .then(function(urls) {
        if (urls.length === 0) {
          this.logger.warn('No urls for uesing');
          return;
        }
        this.queue.pushAllFilter(urls);
      })
      .catch(function(err) {

      })
  }



}

export default Scrapyer;