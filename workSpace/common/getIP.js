var scrapy = require('./scrapy.js');

var url = 'http://www.xicidaili.com/nn/';
var selector = ['tr >td:nth-child(3)', 'tr >td:nth-child(4)', 'tr >td:nth-child(5) >a'];

scrapy(url, selector)
  .then(function(page) {
    // console.log(page);
    console.log('success');
  })
  .catch(function(err) {
    console.log(err.stack);
  });