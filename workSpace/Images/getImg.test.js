let getImg = require('./getImg.js');
let url = 'http://desk.zol.com.cn/';
getImg(url)
  .then(function() {
    console.log('download success');
  })
  .catch(function(err) {
    console.log(err.stack);
  });