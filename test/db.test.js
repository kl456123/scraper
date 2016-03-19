/**
 * test db_utils.js for using mongodb
 */
var exportObj = require('../utils/ioUtils.js');


var insertDocument = exportObj.insertDocument;
var findDocument = exportObj.findDocument;
var deleteDocument = exportObj.deleteDocument;

// mock data
var data = {
	'name': 'breakpoint',
	'age': 12
};

var data1 = {
	'name': 'wife',
	'age': 12
};
describe('#mongodb utils test', function() {

	before('#insert some mock data', function(done) {
		insertDocument(data1)
			.then(function() {
				console.log('init database');
				done();
			})
			.catch(function(err) {
				done(err);
			});
	});


	// after('#clear database', function(done) {
	// 	deleteDocument({})
	// 		.then(function() {
	// 			done();
	// 		})
	// 		.catch(function(err) {
	// 			done(err);
	// 		});
	// });

	describe('#Insert test', function() {
		it('#should insert document to database', function(done) {
			insertDocument(data)
				.then(function(result) {
					done();
				})
				.catch(function(err) {
					done(err);
				});
		});
	});

	describe('#Find test', function() {
		it('#should find document from database', function(done) {
			findDocument({
					'age': 12
				})
				.then(function(docs) {
					console.log(docs);
					console.log(docs.length);
					done();
				})
				.catch(function(err) {
					done(err);
				});
		});
		it('#find all document from database', function(done) {
			findDocument({})
				.then(function(docs) {
					console.log(JSON.stringify(docs));
					done();
				})
				.catch(function(err) {
					done(err);
				});
		});
	});
});