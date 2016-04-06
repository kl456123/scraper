var scrapy = require('./scrapy.js');

var url = 'http://www.xicidaili.com/nn/';
var selector = 'tr >td:nth-child(3)';

scrapy(url, selector)
  .then(function(page) {
    // console.log(page);
    console.log('success');
  })
  .catch(function(err) {
    console.log(err);
  });