var proRequest = require('../utils/utils.js').proRequest;
var request = require('request');
var options = require('../data/headers/options.js');
// var writeFile = require('')
var options_get = options.options_get1;

options_get.url = 'http://www.kuaidaili.com/';
options_get.proxy = "http://58.217.200.32";


// proRequest(options_get)
//   .then(function(obj) {
//     var page = obj[0];
//     var requrl = obj[1];
//     console.log(page);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// var proxyUrl = "http://" + user + ":" + password + "@" + host + ":" + port;

// var proxiedRequest = request.defaults({
//   'proxy': proxyUrl
// });

// proxiedRequest.get("http://foo.bar", function(err, resp, body) {
//   ...
// })
//
request({
  url: 'http://www.ip138.com/',
  method: 'GET',
  proxy: 'http://119.188.94.145/',
}, function(error, response, body) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(body);
});