var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

// load simple config
// then move all to a file
var url = 'mongodb://localhost:27017/scraper';
var collection = 'images';



// There are some ops of mongodb database.


var _insertDocument = function(db, data, callback) {
	db.collection(collection).insertOne(data, function(err, result) {
		// console.log('Insert Success!');
		callback(err, result);
	});
};


function insertDocument(data) {
	return new Promise(function(resolve, reject) {
		MongoClient.connect(url, function(err, db) {
			if (err) {
				reject(err);
				return;
			} else {
				_insertDocument(db, data, function(err, result) {
					if (err) {
						reject(err);
						return;
					} else {
						resolve(result);
					}
					db.close();
				});
			}
		});
	});

}

var _findDocument = function(db, index, callback) {
	var cursor;
	if (index === {}) {
		cursor = db.collection(collection).find();
	} else {
		cursor = db.collection(collection).find(index);
	}

	cursor.toArray(function(err, docs) {
		callback(null, docs);
	});

};


function findDocument(index) {
	return new Promise(function(resolve, reject) {
		MongoClient.connect(url, function(err, db) {
			if (err) {
				reject(err);
				return;
			}
			_findDocument(db, index, function(err, docs) {
				if (err) {
					reject(err);
					return;
				}
				resolve(docs);
				db.close();

			});
		});
	});
}


var _deleteDocument = function(db, index, callback) {
	db.collection(collection).deleteMany(index, function(err, results) {
		callback(err, results);
	});
};

function deleteDocument(index) {
	return new Promise(function(resolve, reject) {
		MongoClient.connect(url, function(err, db) {
			if (err) {
				reject(err);
				return;
			}
			_deleteDocument(db, index, function(err, results) {
				if (err) {
					reject(err);
					return;
				}
				resolve(results);
				db.close();

			});
		});
	});
}



// There are some ops about files.

/**
 * delete file according to the path
 * @param  {string} path  path to file
 * @return {promise class}      process result or error...
 */
function deleteFile(path) {
	return new Promise(function(resolve, reject) {
		fs.unlink(path, function(err) {
			if (err) {
				reject(err);
			} else {
				resolve('success delete file!');
			}
		});
	});
}



/**
 * save data to file
 * @param  {string} path   path to file even if it is not found!
 * @param  {string} data  data you want to save
 * @return {promise class}
 */
function writeFile(path, data, chraset) {
	// default utf8
	if (chraset === undefined) {
		chraset = 'utf8';
	}
	return new Promise(function(resolve, reject) {
		fs.writeFile(path, data, chraset, function(err) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}


function appendFile(pathname, data) {
	return new Promise(function(resolve, reject) {
		fs.appendFile(pathname, data + '\n', 'utf8', function(err) {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});

}

/**
 * rename file
 * @param  {string} oldPath old path
 * @param  {string} newPath ....
 * @return {promise class}         ....
 * @requires fs module
 */
function renameFile(oldPath, newPath) {
	return new Promise(function(resolve, reject) {
		fs.rename(oldPath, newPath, function(err) {
			if (err) {
				reject(err);
			} else {
				resolve('success rename file!');
			}
		});
	});
}


// function downloadFile(url,path,callback){
// 	return new Promise(function(resolve,reject){
// 		request()
// 	});
// }

function readArray(file) {
	return new Promise(function(resolve, reject) {
		fs.readFile(file, 'utf8', function(err, data) {
			if (err) {
				// console.log(err);
				reject(err);
				return;
			}
			resolve(data.split(','));
			// console.log(data);
		});
	});

}


var exportObj = {};

// export some ops of dbs
exportObj.insertDocument = insertDocument;
exportObj.findDocument = findDocument;
exportObj.deleteDocument = deleteDocument;


// export some ops about files
exportObj.writeFile = writeFile;
exportObj.renameFile = renameFile;
exportObj.deleteFile = deleteFile;
exportObj.appendFile = appendFile;
exportObj.readArray = readArray;
// exportObj.downloadFile=downloadFile;

module.exports = exportObj;