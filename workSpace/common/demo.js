//construct one instantce of single scrapyer for test


/*es6 format*/
import Scrapyer from './scrapyer.js';

let scrapyer = new Scrapyer();
scrapyer.initial();
scrapyer.setNotText();
scrapyer.seturl('http://image.baidu.com/');
scrapyer.setSelector('img');
scrapyer.setRecurrent(true);
// scrapyer.setUrlSelector('div.prev>a');
scrapyer.setLoggerLevel('ALL');
// scrapyer.setIsDownloadPage(true);
scrapyer.start();