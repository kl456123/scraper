var cheerio = require('cheerio');

var exportObj = require('../../utils/utils.js');
var writeFile = require('../../utils/ioUtils.js').writeFile;
var appendFile = require('../../utils/ioUtils.js').appendFile;

var proRequest = exportObj.proRequest;
var download = exportObj.download;
var parseUrlForFileName = exportObj.parseUrlForFileName;
var handleUrl = exportObj.handleUrl;

var path = '../../data/';


/**
 *the  data of the list can not match each other!
 */

import defaultConfig from '../../conf/default.js';
let log4js = require('log4js');
let logger = log4js.getLogger('handler');


logger.setLevel(defaultConfig.handlerLoggerLevel);

function handler(page, selector, requrl, isText) {
  // console.log(page);
  var $ = cheerio.load(page);
  // console.log($);
  var data = [];
  if (typeof selector === 'string') {
    data = $(selector).toArray();
  } else {
    selector.forEach(function(one, index) {
      data[index] = $(selector[index]).toArray();
    });

  }

  //  to tell data object if it is text or url
  // default
  if (isText === undefined) {
    isText = true;
  }

  if (!isText) {
    //if it is url ,download from the url
    // console.log('afsaf');
    //
    let len = data.length;
    if (len === 0) {
      logger.warn('select nothing,please change selector');
      // process.exit();
      return;
    }


    data.forEach(function(one) {

      if (one === undefined) {
        logger.warn('it is undefined,maybe sth wrong with your selector');

        return;
      }
      // console.log(one);
      let src = one.attribs.src || one.attribs.srch || one.attribs.loadsrc;
      // console.log(src);
      // console.log(requrl);
      // get filename
      var filename = parseUrlForFileName(src);
      // console.log(src);
      let presrc = src;
      src = handleUrl(src, requrl);
      // abort it if undefined
      if (src === undefined) {
        logger.debug('it is undefined, maybe sth wrong with handleUrl function or src');
        logger.debug(presrc);
        return;
      }
      // console.log(src);
      download(src, path + 'tmp/' + filename)
        .then(function() {
          logger.info(filename + ' download success');
          // console.log('download ' + filename + 'success');

          // when download all file ,exit
          len--;
          if (len === 0 && defaultConfig.recurrent === false) {
            process.exit();
          }
        })
        .catch(function(err) {
          len--;
          logger.fatal(src);
          // console.log(err);
        });
    });
  } else {
    // if it is text,save it!
    var saveObj = '';
    // default name
    var saveName = 'demo';
    if (typeof selector === 'string') {
      data.forEach(function(one) {
        // console.log(one);
        if (one.children[0] == undefined) {
          return;
        }
        var _data = one.children[0].data;
        saveObj += JSON.stringify(_data) + '\n';
      });
    } else {
      var len = data[0].length;

      for (var i = 0; i < len; i++) {
        for (var j = 0; j < selector.length; j++) {
          // deal expect
          if (data[j][i] === undefined) {
            logger.warn('i: ' + j + ' j: ' + i + 'data is not exist,abort it ');
            continue;
          }
          if (data[j][i].children[0] == undefined) {
            logger.warn('i: ' + j + ' j: ' + i + 'data is undefined,abort it ');
            continue;
          }
          var _data = JSON.stringify(data[j][i].children[0].data);
          saveObj += _data + '   ';
        }
        saveObj += '\n';
      }
    }

    appendFile(path + saveName, saveObj)
      .then(function() {

        // console.log(saveName + ' saved success!');
        logger.info(saveName + ' saved successly');
        if (defaultConfig.recurrent === false)
          process.exit();
      })
      .catch(function(err) {
        logger.fatal(err);
        // console.log(err);
      });
  }

}

module.exports = handler;


// I want to change it to a class.
//
//
//
let options = {
  "name": "handler",
  "loggerLevel": "ALL",
  "downloadPath": "../../data/",
  "isText": 1,
  "page": ,
  "selector": ,
  "requrl": ,
  "":
};
class Handler {
  constructor(options) {
    Object.assgin(this, options);
    this.logger = log4js.getLogger(this.name);

  }


  inform() {
    this.logger.info('handler name: ' + this.name);
    this.logger.info('handler logger level: ' + this.loggerLevel);
    this.logger.info('handler downloadPath: ' + this.downloadPath);
    // check isText
    let isText = '';
    if (this.isText) {
      isText = 'Text';
    } else {
      isText = 'Non-Text';
    }
    this.logger.info('handler for: ' + isText);
    this.logger.info('handler url: ' + this.requrl);

    // this.logger.info('handler selector: ' + this.selector);
  }

  // download text
  textDownload() {

  }

  // download file(images or other binary file)
  fileDownload() {

  }

  //initial handle web page
  initHandle() {

  }

  //
  handleAll() {
    let data = this.initHandle();

    if (this.isText) {
      textDownload();
    } else {
      fileDownload();
    }
  }

}