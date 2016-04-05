var exportObj = require('../utils/utils.js');

var download = exportObj.download;


var path = '../data/temp/demo.html';
var url = 'http://www.jd.com';

download(url, path)
  .then(function() {
    console.log('success\n');
  })
  .catch(function(err) {
    console.log(err);
  });