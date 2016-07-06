import multiScrapy from './multiProcess.js';
// var handler = require('./handler.js');

let urlSelector = 'ul>li>a[id*="p"]';
let selector = ['tr >td:nth-child(1)', 'tr >td:nth-child(2)'];
// selector = ['ul>li>a[id*="p"]'];
multiScrapy(urlSelector, selector);