let request = require('request');
let insertDocument = require('../utils/ioUtils.js').insertDocument;
let writeFile = require('../utils/ioUtils.js').writeFile;


let url = 'http://desk.fd.zol-img.com.cn/t_s720x360c5/g5/M00/03/0F/ChMkJldQ_aKIcVJDAA4MwNZpK-gAASNUgB7-JwADgzY897.jpg';

let path = '../data/ChMkJldQ_aKIcVJDAA4MwNZpK-gAASNUgB7-JwADgzY897.jpg';

let options = {
  encoding: 'binary'
};
options.url = url;
request(options, function(error, response, body) {
  if (error) {
    console.log(error.stack);
    return;
  }

  writeFile(path, body, 'binary')
    .then(function() {
      console.log('images download success');
    })
    .catch(function(err) {
      console.log(err.stack);
    });

});