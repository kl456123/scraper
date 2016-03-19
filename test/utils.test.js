var download = require('../utils/utils.js').download;



// mock data.
var captcha_url = 'https://www.zhihu.com/captcha.gif';
var path = '../data/captcha/captcha.gif';


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
  })
});