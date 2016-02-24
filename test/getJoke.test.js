/**
 * test getJokes function
 */
var should = require('should');
var getJokes = require('../getJokes.js');


// mock urlSrc
var urlSrc = 'http://xiaohua.zol.com.cn/detail31/30142.html';


// pass
describe('#getJokes test', function() {
	it('#return correct text', function(done) {
		getJokes(urlSrc)
			.then(function(url) {
				url.should.equal('http://xiaohua.zol.com.cn/detail31/30143.html');
				done();
			})
			.catch(function(err) {
				done(err);
			});
	});


});