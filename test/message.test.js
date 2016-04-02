var should = require('should');

var Queue = require('../workSpace/common/message.js');
var async = require('../utils/utils.js').async;



describe('test Queue', function() {
  var q;
  before('new a queue', function() {
    q = new Queue();

  });

  afterEach('clear all elements in queue', function() {
    while (!q.isEmpty()) {
      q.pop();
    }
  });

  describe('#test base function', function() {

    it('#test getLength', function() {
      q.getLength().should.be.equal(0);
    });

    it('#test push', function() {
      q.push('a');
      q.getLength().should.be.equal(1);
    });

    it('#test pop', function() {
      q.push('b');
      var msg = q.pop();
      q.getLength().should.be.equal(0);
      msg.should.be.equal('b');
    });

    it('#test isEmpty', function() {
      q.isEmpty().should.be.equal(true);
    });

  });


  describe('#test async feature', function() {
    it('#process message by async', function(done) {

      async(function() {
        q.push('c');
      }, function() {
        q.getLength().should.be.equal(1);
        var ele = q.pop();
        ele.should.be.equal('d');

      });

      async(function() {
        var ele = q.pop();
        ele.should.be.equal('c');
        q.push('d');
      }, function() {
        q.getLength().should.be.equal(0);
        done();
      });
    });

  });

});