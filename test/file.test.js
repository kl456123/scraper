var exportObj = require('../utils/ioUtils.js');
var should = require('should');

var readArray = exportObj.readArray;
var writeFile = exportObj.writeFile;

// mock array

var arr = ['asf', 'dfg', 'asfaf'];
var path = '../data/temp/temp';

describe('test read file', function() {

  it('#test read array from file', function(done) {
    writeFile(path, arr)
      .then(function() {

        readArray(path)
          .then(function(data) {
            for (var i = 0; i < data.length; i++) {
              data[i].should.be.equal(arr[i]);
            }

            done();
          })
          .catch(function(err) {
            done(err);
          });


      })
      .catch(function(err) {
        done(err);
      });
  });
});