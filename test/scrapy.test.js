var scrapy = require('../workSpace/common/scrapy.js');
var proRequest = require('../utils/utils.js').proRequest;
var should = require('should');
var writeFile = require('../utils/ioUtils.js').writeFile;

var url = 'http://www.w3schools.com/jquery/jquery_ref_selectors.asp';
var url1 = 'https://api.jquery.com/category/selectors/';
var selector = '[href="sel_all.asp"]';

describe('test proRequest function', function() {
  this.timeout(5000);
  it('#test return obj', function(done) {
    proRequest(url1)
      .then(function(obj) {
        // console.log(obj);
        var page = obj[0];
        var requrl = obj[1];
        // console.log(page);
        console.log(requrl);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});

describe('one process scrapy function test', function() {
  // the test timeout !
  this.timeout(10000);
  it('#test download text ', function(done) {
    scrapy(url, selector)
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

});


var path = '../data/temp/';
var filename;
var saveObj = {};
describe.only('test writeFile function', function() {
  saveObj.name = 'breakpoint';
  saveObj.age = 20;
  filename = 'obj';
  it('#test save obj to file', function(done) {
    writeFile(path + filename, JSON.stringify(saveObj))
      .then(function(data) {
        // data.should.be.equal(saveObj);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
  // filename = 'str';
  // saveObj = 'breakpoint';
  it.skip('#test save string to file', function(done) {
    writeFile(path + filename, saveObj)
      .then(function(data) {
        data.should.be.equal(saveObj);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});