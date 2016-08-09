import should from 'should';
import {
  newScrapyer,
  workScrapyer
} from '../workSpace/redis/newScrapyer.js';
import redis from 'redis';

let setName = 'testURL';
let url = 'http://www.zhihu.com/';
let client;
describe('test newScrapyer', function() {
  before('create client', function() {
    client = redis.createClient();
  });


  describe('#test function newScrapyer', function() {

    it('##test callback', function(done) {

      newScrapyer(client, setName, url)
        .then(function() {
          done();
        })
        .catch(function(err) {
          client.quit();
          done(err);
        });
    });
  });

  describe('#test function workScrapyer', function() {
    it('##', function(done) {
      workScrapyer(client, setName)
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});