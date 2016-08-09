import {
  handleUrl
} from '../utils/utils.js';
import should from 'should';

import {
  getURL
} from '../workSpace/Images/getURL.js';

// mock data
let urlsrc = 'http://www.xiaohuayoumo.com/aiqingxiaohua/21885.html';
let temp = '/show/1/51346.shtml';
let urlSelector = 'a';
let another_url = 'http://www.zhihu.com/';
describe('test function getURL ', function() {

  describe('#test getURL', function() {
    it('#test URL is legal', function(done) {
      getURL(another_url, urlSelector)
        .then(function(urls) {
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  // test handleUrl
  describe('#test handleUrl function ', function() {
    it('#test URL is legal', function() {
      var res = handleUrl(temp, urlsrc);
      // console.log(res);
      res.should.be.equal('http://www.xiaohuayoumo.com/show/1/51346.shtml');
    });
  });

});