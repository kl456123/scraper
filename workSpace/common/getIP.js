var scrapy = require('./scrapy.js');

var url = 'http://www.freeproxylists.net/';
var selector = ['tr>td:nth-child(2)', 'tr>td:nth-child(3)', 'tr>td:nth-child(4)', 'tr>td:nth-child(8)'];

scrapy(url, selector)
  .then(function(page) {
    // console.log(page);
    console.log('success');
  })
  .catch(function(err) {
    console.log(err.stack);
  });