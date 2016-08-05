/*import request from 'request';
import exportObj from '../../data/headers/options.js';*/
import requestPro from './requestPro.js';

import Handler from './handler.js';

// let options_get = options.options_get;
let url = 'http://www.zhihu.com/';

let handler = new Handler();
handler.setIsText(1);
handler.setSelector('a');

requestPro(url)
  .then(function(data) {
    handler.handle(data, url);
  })
  .catch(function(err) {
    console.log(err);
  });