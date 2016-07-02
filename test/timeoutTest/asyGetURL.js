var asyGetURL = require('../../workSpace/Images/getURL.js').asyGetURL;
var options = require('../../data/headers/options.js');

var options_get = options.options_get1;

options_get.url = 'http://www.kuaidaili.com/';

var urlSelector = 'ul>li>a[id*="p"]';

asyGetURL(options_get, urlSelector, function(url) {
  console.log(url);
});