var handler = require('./handler.js');
var exportObj = require('../../utils/utils.js');

var proRequest = exportObj.proRequest;
var options = require('../../data/headers/options.js');

var options_get = options.options_get;

function scrapy(url, selector, isText) {
  return new Promise(function(resolve, reject) {
    options_get.url = url;
    proRequest(options_get)
      .then(function(obj) {
        // console.log(obj);
        var page = obj[0];
        var requrl = obj[1];
        handler(page, selector, requrl, isText);
        resolve(page);
      })
      .catch(function(err) {
        reject(err);
        // console.log(err);
      });
  });

}

// var proScrapy = function() {
//   return new Promise(function(resolve, reject) {

//   });
// };

module.exports = scrapy;