var scrapy = require('../../workSpace/common/scrapy.js');


var url = 'http://www.w3schools.com/jquery/jquery_ref_selectors.asp';
var selector = '[href="sel_all.asp"]';


scrapy(url, selector)
  .then(function() {
    console.log('success');
  })
  .catch(function(err) {
    console.log(err);
  });