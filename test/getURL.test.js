var exportObj = require('../workSpace/Images/getURL.js');
var handleUrl = require('../utils/utils.js').handleUrl;
var should = require('should');

var getURL = exportObj.getURL;


// mock data
let urlsrc = 'http://desk.zol.com.cn/';
let temp = 'show/1/51346.shtml';
let urlSelector = 'a';
describe('test getURL ', function() {

  describe('#test getURL', function() {
    it('#test URL is legal', function(done) {
      getURL(urlsrc, urlSelector)
        .then(function(urls) {
          urls.forEach(function(one) {
            console.log(one);
          });
          console.log(urls.length);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  // test handleUrl
  describe.skip('#test handleUrl function ', function() {
    it('#test URL is legal', function() {
      var res = handleUrl(temp, urlsrc);
      // console.log(res);
      res.should.be.equal('http://joke.876.tw/show/1/51346.shtml');
    });
  });

});