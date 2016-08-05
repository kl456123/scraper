import request from 'request';
import {
  options_get
} from '../../data/headers/options.js';


let requestPro = function(url) {
  options_get.url = url;
  return new Promise(function(resolve, reject) {
    request.get(options_get, function(err, res, body) {
      if (err) {
        reject(err);
        return;
      }
      resolve(body);
    });
  });
};


export default requestPro;