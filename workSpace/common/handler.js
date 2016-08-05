import cheerio from 'cheerio';

import exportObj from '../../utils/utils.js';

let writeFile = require('../../utils/ioUtils.js').writeFile;
let appendFile = require('../../utils/ioUtils.js').appendFile;

let proRequest = exportObj.proRequest;
let download = exportObj.download;
let parseUrlForFileName = exportObj.parseUrlForFileName;
let handleUrl = exportObj.handleUrl;

// let path = '../../data/';


/**
 *the  data of the list can not match each other!
 */

import defaultConfig from '../../conf/default.js';
let log4js = require('log4js');
let logger = log4js.getLogger('handler');

import handlerDefaultConfig from '../../conf/handlerDefaultConfig.js';


class Handler {
  constructor(options) {


    //load default configuration
    Object.assign(this, handlerDefaultConfig);
    if (typeof options === 'object') {
      Object.assign(this, options);
    }


    this.logger = log4js.getLogger(this.name);
    this.logger.setLevel(this.loggerLevel);

  }

  // set function
  //
  //
  setIsText(isText) {
    this.isText = isText;
  }

  setRecurrent(flag) {
    this.recurrent = flag;
  }

  setSelector(selector) {
    this.selector = selector;
  }


  inform(requrl) {
    this.logger.info('handler name: ' + this.name);
    this.logger.info('handler logger level: ' + this.loggerLevel);
    this.logger.info('handler downloadPath: ' + this.downloadPath);
    this.logger.info('handler for urls: ' + requrl);
    // check isText
    let isText = '';


    if (this.isText) {
      isText = 'Text';
    } else {
      isText = 'Non-Text';
    }
    this.logger.info('handler for: ' + isText);

    // this.logger.info('handler selector: ' + this.selector);
  }

  // download text
  textDownload(data) {
    // put all into a string.
    let that = this;
    that.logger.debug('textDownload');
    let saveObj = '';

    let saveName = that.filename;
    if (typeof that.selector === 'string') {
      // if it is a string...

      data.forEach(function(one) {

        if (one.children[0] == undefined) {
          return;
        }
        let _data = one.children[0].data;
        saveObj += JSON.stringify(_data) + '\n';

      });

    } else {

      let len = data[0].length;

      for (let i = 0; i < len; i++) {
        for (let j = 0; j < that.selector.length; j++) {

          // deal expect
          if (data[j][i] === undefined) {
            logger.warn('i: ' + j + ' j: ' + i + 'data is not exist,abort it ');
            continue;
          }

          if (data[j][i].children[0] == undefined) {
            logger.warn('i: ' + j + ' j: ' + i + 'data is undefined,abort it ');
            continue;
          }

          let _data = JSON.stringify(data[j][i].children[0].data);
          saveObj += _data + '   ';
        }
        saveObj += '\n';
      }
    }

    appendFile(that.downloadPath + saveName, saveObj)
      .then(function() {

        logger.info(saveName + ' saved successly');
        // that.logger.debug(typeof this);
        if (that.recurrent === false)
          process.exit();

      })
      .catch(function(err) {
        logger.fatal(err);
      });
  }

  // download file(images or other binary file)
  // requrl just for find filename of file needing to be downloaded
  fileDownload(data, requrl) {
    let that = this;
    that.logger.debug('fileDownload');
    let len = data.length;
    that.logger.debug(len);
    if (len === 0) {
      logger.warn('select nothing,please change selector');
      return;
    }

    if (typeof that.selector === 'array' || typeof data[0] === 'array') {
      that.logger.warn("selector don't support select file with array method at present.please select file with string input");
      return;
    }


    data.forEach(function(one) {

      if (one === undefined) {
        that.logger.warn('it is undefined,maybe sth wrong with your selector');

        return;
      }

      // perhaps maybe other format
      let src = one.attribs.src || one.attribs.srch || one.attribs.loadsrc;

      // get filename
      let filename = parseUrlForFileName(src);

      let presrc = src;

      src = handleUrl(src, requrl);
      // abort it if undefined
      that.logger.debug(src);
      if (src === undefined) {
        that.logger.debug('it is undefined, maybe sth wrong with handleUrl function or src');
        that.logger.debug(presrc);
        return;
      }

      download(src, that.downloadImgPath + filename)
        .then(function() {
          that.logger.info(filename + ' download success');

          // when download all file ,exit
          len--;
          if (len === 0 && that.recurrent === false) {
            process.exit();
          }
        })
        .catch(function(err) {
          len--;
          that.logger.fatal(src);

        });
    });
  }

  //initial handle web page
  _initHandle(page, selector) {
    let $ = cheerio.load(page);

    let data = [];
    if (typeof selector === 'string') {
      data = $(selector).toArray();
    } else {
      selector.forEach(function(one, index) {
        data[index] = $(selector[index]).toArray();
      });

    }
    return data;
  }

  //handle all thing here
  handle(page, requrl) {
    this.inform(requrl);
    let data = this._initHandle(page, this.selector);

    if (this.isText === 1) {

      this.textDownload(data);
    } else {

      this.fileDownload(data, requrl);
    }
  }

  downloader() {
    return new Promise(function() {

    });
  }

  /*  start() {
      this.inform();

    }*/

}

module.exports = Handler;
// export default Handler;