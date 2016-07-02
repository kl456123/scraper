var handler = require('./handler.js');
var exportObj = require('../../utils/utils.js');

var proRequest = exportObj.proRequest;
// var options = require('../../data/headers/options.js');

// var options_get = options.options_get1;

// function scrapy(url, selector, isText) {
//   return new Promise(function(resolve, reject) {
//     options_get.url = url;
//     proRequest(options_get)
//       .then(function(obj) {
//         // console.log(obj);
//         var page = obj[0];
//         var requrl = obj[1];
//         handler(page, selector, requrl, isText);
//         resolve(page);
//       })
//       .catch(function(err) {
//         reject(err);
//         // console.log(err);
//       });
//   });

// }



// module.exports = scrapy;



// es6 format

let log4js = require('log4js');
let writeFile = require('../../utils/ioUtils.js').writeFile;

class Scrapyer {
  constructor(options) {
    //default configuration
    this.isText = 1;
    this.delay = 0;
    this.isDownloadPage = 0;
    this.loggerLevel = 'ALL';
    this.downloadPath = '../../data/';
    /*default filename is demo, you can change it*/
    this.filename = 'demo';
    this.selector = [];
    // options used for initial Scrapyer
    if (typeof options === 'object') {

      Object.assign(this, options);
      this.options = options;

    } else if (typeof options === 'string') {
      let name = options;

      this.name = name;


    } else {

      throw new Error('options must be object or string');
    }
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

    proRequest(tmp)
      .then(function(retobj) {
        let page = retobj[0];
        let requrl = retobj[1];
        handler(page, that.selector, requrl, that.isText);

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


  // set functions
  seturl(url) {
    // check url format
    this.url = url;
    if (this.options) {
      this.options.url = url;
    }
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



}

export default Scrapyer;