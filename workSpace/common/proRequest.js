//construct one instantce of single scrapyer for test


/*es6 format*/
import Scrapyer from './scrapyer.js';

let scrapyer = new Scrapyer();
scrapyer.initial();
// scrapyer.setNotText();
scrapyer.seturl('http://www.xiaohuayoumo.com/aiqingxiaohua/21895.html');
scrapyer.setSelector(['h1']);
// scrapyer.setIsDownloadPage(true);
scrapyer.start();