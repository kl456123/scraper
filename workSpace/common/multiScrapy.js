var multiScrapy = require('./multiProcess.js');
// var handler = require('./handler.js');

var urlSelector = 'ul>li>a[id*="p"]';
var selector = ['tr >td:nth-child(1)', 'tr >td:nth-child(2)'];
// selector = ['ul>li>a[id*="p"]'];
multiScrapy(urlSelector, selector);