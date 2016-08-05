var exportObj = require('../workSpace/Images/getURL.js');
var handleUrl = require('../utils/utils.js').handleUrl;
var should = require('should');
let options = require('../data/headers/options.js');
let options_get = options.options_get;
var getURL = exportObj.getURL;


// mock data
let urlsrc = 'http://www.xiaohuayoumo.com/aiqingxiaohua/21885.html';
let temp = 'show/1/51346.shtml';
let urlSelector = 'a';
options_get.url = urlsrc;

describe('test getURL ', function() {

  describe('#test getURL', function() {
    it('#test URL is legal', function(done) {
      getURL(options_get, urlSelector)
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