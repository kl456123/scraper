// var multiScrapy = require('multiScrapy');
var cheerio = require('cheerio');

var exportObj = require('../../utils/utils.js');
var writeFile = require('../../utils/ioUtils.js').writeFile;
// console.log(writeFile);
var proRequest = exportObj.proRequest;
var download = exportObj.download;
var parseUrlForFileName = exportObj.parseUrlForFileName;
var handleUrl = exportObj.handleUrl;


var path = '../../data/';

function handler(page, selector, requrl, isText) {
  // console.log(page);
  var $ = cheerio.load(page);
  // console.log($);
  var data = {};
  if (typeof selector === 'string') {
    data = $(selector).toArray();
  }

  //  to tell data object if it is text or url

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
    data.forEach(function(one) {
      // console.log(one);
      data = one.children[0].data;
      saveObj += JSON.stringify(data) + '\n';
    });

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