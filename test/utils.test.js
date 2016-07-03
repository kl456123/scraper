var download = require('../utils/utils.js').download;
var handleUrl = require('../utils/utils.js').handleUrl;
var should = require('should');

// mock data.
var captcha_url = 'https://www.zhihu.com/captcha.gif';
var path = '../data/captcha/captcha.gif';

var url = '/bizhi/6364_78316_2.html';
var preurl = 'http://desk.zol.com.cn/';

describe('#utils test', function() {
  describe.skip('#download test', function() {
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
      nowurl.should.be.equal('http://desk.zol.com.cn/bizhi/6364_78316_2.html');
    });
  });
});