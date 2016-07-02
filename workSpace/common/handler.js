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


let log4js = require('log4js');
let logger = log4js.getLogger('demo');
logger.setLevel('ALL');

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

    if (data.length === 0) {
      logger.warn('select nothing,please change selector');
    }
    data.forEach(function(one) {

      if (one === undefined) {
        logger.warn('it is undefined,maybe sth wrong with your selector');
        return;
      }
      // console.log(one);
      let src = one.attribs.src || one.attribs.srch;
      // console.log(src);
      // console.log(requrl);
      // get filename
      var filename = parseUrlForFileName(src);
      // console.log(src);
      src = handleUrl(src, requrl);
      // abort it if undefined
      if (src === undefined) {
        logger.debug('it is undefined, maybe sth wrong with handleUrl function or src');
        return;
      }

      download(src, path + 'temp/' + filename)
        .then(function() {
          logger.info(filename + ' download success');
          // console.log('download ' + filename + 'success');

        })
        .catch(function(err) {
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

    // writeFile(path + saveName, saveObj)
    //   .then(function() {
    //     console.log(saveName + ' saved success!');
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    appendFile(path + saveName, saveObj)
      .then(function() {

        // console.log(saveName + ' saved success!');
        logger.info(saveName + ' saved successly');
      })
      .catch(function(err) {
        logger.fatal(err);
        // console.log(err);
      });
  }

}

module.exports = handler;


// I want to change it to a class.