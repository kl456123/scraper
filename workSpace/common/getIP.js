var scrapy = require('./scrapy.js');

var url = 'http://www.kuaidaili.com/';
var selector = ['ul>li>a[id*="p"]'];

scrapy(url, selector)
  .then(function(page) {
    // console.log(page);
    console.log('success');
  })
  .catch(function(err) {
    console.log(err.stack);
  });