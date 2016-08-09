import {
  sadd,
  spop,
  scard,
  checkRedis,
  initRedis
} from '../workSpace/redis/redis.js';

import should from 'should';
import redis from 'redis';

let setName = 'test';
let mockData = ['1', '2', '3', '45'];
let errorData = {}
let client = {};
let numCPUs = 3;
let url = 'http://www.baidu.com/';
describe('#test redis', function() {

  before('#create client', function() {
    client = redis.createClient();
  });
  // test sadd
  describe('#test function sadd ', function() {
    it('##test add sth into set', function(done) {
      sadd(client, setName, mockData)
        .then(function(len) {
          // console.log(len);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });


    it.skip('##test error handler', function(done) {
      sadd(client, setName, errorData)
        .then(function(len) {
          done();
        })
        .catch(function(err) {
          // err.should.ifError();
          done(err);
        });
    });

  });


  // test checkRedis
  describe('#test function checkRedis ', function() {
    it('##test callback', function(done) {
      checkRedis(client, setName, numCPUs)
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it.skip('##test error handler', function(done) {

    });
  });

  // test initRedis function
  describe('#test function initRedis', function() {
    it('##test callback', function(done) {
      initRedis(client, setName, url, 'a', 4)
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  // test spop
  describe('#test function spop', function() {
    it('##test pop sth from set', function(done) {
      spop(client, setName)
        .then(function(url) {
          url.should.not.equal(null);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });



  after('#client quit', function() {
    client.quit();
  });

});