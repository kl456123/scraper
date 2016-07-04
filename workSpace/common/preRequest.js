//construct one instantce of single scrapyer for test
/*es6 format*/
import Scrapyer from './scrapyer.js';

// let options = require('../../data/headers/options.js');
// let options_get = options.options_get;
// options_get.url = 'http://desk.zol.com.cn/';
// options_get.name = 'demo';

let scrapyer = new Scrapyer();
scrapyer.initial();
// scrapyer.setNotText();
scrapyer.seturl('http://www.zhihu.com/');
scrapyer.setSelector(['a']);
// scrapyer.setIsDownloadPage(true);
scrapyer.start();