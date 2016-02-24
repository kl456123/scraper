var fs = require('fs');
var gm = require('gm');
var request = require('request');
var url = require('url');
// var qs = require('querystring');
//
//
/*
there are some utils function ...
 */



/**
 * preprocess url to use for Request
 * @param  {string} url    relative position of the webpage
 * @param  {string} preUrl main url of the webpage
 * @return {string/undefined}        aviliable url to visit in the brower.if error,return undefined.
 */
function handleUrl(URL, preURL) {

	// handle preUrl

	var URLParse = url.parse(preURL);

	var protocol = URLParse.protocol;
	var host = URLParse.host;
	preURL = protocol + '//' + host;

	// ignore error url
	/*jshint scripturl:true*/
	if (URL === undefined || URL === 'javascript:;' || URL === '/') {
		// throw new Error("url is undefined!");
		return;
	}
	URL = URL.trim();
	// add http prex
	if (URL.slice(0, 2) === '//') {
		var head = 'http:';
		URL = head.concat(URL);
	}

	// add static path
	if (URL[0] === '/') {
		URL = preURL.concat(URL);
	}

	if (URL[0] === '.') {
		URL = preURL.concat(URL.slice(1));
	}
	if (URL.slice(-1) === '/') {
		URL = URL.slice(0, -1);
	}
	// remain
	return URL;

}



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
function writeFile(path, data) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(path, data, 'utf8', function(err) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
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


/**
 * process Request by promise to use it well
 * @param {string} requrl    url to request
 * @returns {Promise class} a promise to handle request result
 * @requires request
 */
function proRequest(requrl) {
	return new Promise(function(resolve, reject) {
		request(requrl, function(error, response, data) {
			if (!error && response.statusCode === 200) {
				// console.log(body); //返回请求页面的HTML

				// handle data of request. requrl is just for process url later.
				// resolve(body, requrl);// just contain one arg,so use array as the arg.
				resolve([data, requrl]);
			} else {

				//handle error
				reject(error);
			}
		});
	});
}



/**
 * handle some errors of images and select out some big images...
 * @param  {string} path  path to resource
 * @requires              gm and fs modules
 */
function handleImg(path) {

	gm(path)
		.size(function(err, size) {

			if (err || size.height < 200 || size.width < 200) {

				// delete error image
				deleteFile(path)
					.then(function(msg) {
						// print msg....
						console.log(msg);
					})
					.catch(function(err) {
						// print err
						console.log(err);
					});

			}
		});
}

/**
 * download flie from web
 * @param  {string}   uri      [description]
 * @param  {string}   path    path to where you want to save file
 * @param  {Function} callback callback to handle error and get res object...
 * @example
 * downloadFile('http://www.baidu.com/',/path/to/file/,function(err,res){
 * 	//do something you want here!
 * });
 */
function downloadFile(url, path, callback) {
	request.head(url, function(err, res, body) {
		// console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
		// console.log('content-length:', res.header); //图片大小
		if (err) {
			callback(err, null);
			return;
		}

		request(url)
			.on('error', function(err) {

				callback(err, res);
			})
			.pipe(fs.createWriteStream(path)).on('close', function() {

				callback(null, res);
			});
	});
}


var config = {};

function _configAll(conf, defaultConf) {


	for (var key in defaultConf) {
		var value = defaultConf[key];
		config[key] = conf[key] || value;
	}
	return config;

}

function configAll() {
	var defaultConf = require('./Conf/defaultConf.js');
	var conf = require('./config.js');
	return _configAll(conf, defaultConf);
}


var exportObj = {};

exportObj.handleUrl = handleUrl;

exportObj.proRequest = proRequest;

exportObj.handleImg = handleImg;

exportObj.downloadFile = downloadFile;

exportObj.writeFile = writeFile;

exportObj.configAll = configAll;

module.exports = exportObj;