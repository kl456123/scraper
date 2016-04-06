// var multiScrapy = require('multiScrapy');
var cheerio = require('cheerio');

var exportObj = require('../../utils/utils.js');
var writeFile = require('../../utils/ioUtils.js').writeFile;
// console.log(writeFile);
var proRequest = exportObj.proRequest;
var download = exportObj.download;
var parseUrlForFileName = exportObj.parseUrlForFileName;
var handleUrl = exportObj.handleUrl;
var list = exportObj.list;

var path = '../../data/';


/**
 *the  data of the list can not match each other!
 */


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
      // console.log(typeof data[2]);
      // list(data[2]);
    });
    // for (var i = 0; i < selector.length; i++) {

    // }
    // console.log(data[0][0]);
  }

  //  to tell data object if it is text or url
  // default
  if (isText === undefined) {
    isText = true;
  }

  if (!isText) {
    //if it is url ,download from the url

    data.forEach(function(one) {
      if (one === undefined) {
        return;
      }
      var src = one.attribs.src;
      // get filename
      var filename = parseUrlForFileName(src);
      src = handleUrl(src, requrl);

      download(src, path + filename)
        .then(function() {
          console.log('download ' + filename + 'success');
        })
        .catch(function(err) {
          console.log(err);
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
        var _data = one.children[0].data;
        saveObj += JSON.stringify(_data) + '\n';
      });
    } else {
      var len = data[0].length;

      for (var i = 0; i < len; i++) {
        for (var j = 0; j < selector.length; j++) {
          if (data[j][i] === undefined) {
            console.log('i: ' + j + ' j: ' + i);
            continue;
          }
          var _data = JSON.stringify(data[j][i].children[0].data);
          saveObj += _data + '   ';
        }
        saveObj += '\n';
      }
    }

    writeFile(path + saveName, saveObj)
      .then(function() {
        console.log(saveName + ' saved success!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }

}

module.exports = handler;