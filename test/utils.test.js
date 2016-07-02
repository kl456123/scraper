var download = require('../utils/utils.js').download;
var handleUrl = require('../utils/utils.js').handleUrl;
var should = require('should');

// mock data.
var captcha_url = 'https://www.zhihu.com/captcha.gif';
var path = '../data/captcha/captcha.gif';

var url = 'http://desk.fd.zol-img.com.cn/t_s208x130c5/g5/M00/02/05/ChMkJ1d03bCIJKmpAAiW1QZuZMAAATGhAEEKFoACJbt686.jpg';
var preurl = 'http://desk.zol.com.cn/';

describe('#utils test', function() {
  describe('#download test', function() {
    it('it can download from web', function(done) {
      download(captcha_url, path)
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#handleUrl test', function() {
    it('it can handle url to make it neat for use', function() {
      var nowurl = handleUrl(url, preurl);
      nowurl.should.be.equal('http://desk.fd.zol-img.com.cn/t_s208x130c5/g5/M00/02/05/ChMkJ1d03bCIJKmpAAiW1QZuZMAAATGhAEEKFoACJbt686.jpg');
    });
  });
});