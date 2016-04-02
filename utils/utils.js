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
	if (URL === undefined || URL === 'javascript:;' || URL === '/' || URL === '#') {
		// throw new Error("url is undefined!");
		return;
	}
	URL = URL.trim();
	// add http prex
	if (URL.slice(0, 2) === '//') {
		var head = 'http:';
		URL = head.concat(URL);
	}

	if (URL[0] !== '/') {
		var temp = '/';
		URL = temp.concat(URL);
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



var config = {};

function _configAll(conf, defaultConf) {


	for (var key in defaultConf) {
		var value = defaultConf[key];
		config[key] = conf[key] || value;
	}
	return config;

}

function configAll() {
	var defaultConf = require('../conf/defaultConf.js');
	var conf = require('../config.js');
	return _configAll(conf, defaultConf);
}



function download(url, path) {
	return new Promise(function(resolve, reject) {
		request(url)
			.pipe(fs.createWriteStream(path))
			.on('error', function(err) {
				reject(err);

			})
			.on('close', function() {
				resolve();
			});


	});
}



// async function for test async feature
function async(func, callback) {
	func();
	setTimeout(callback, 0);
}

var exportObj = {};

exportObj.handleUrl = handleUrl;

exportObj.proRequest = proRequest;

exportObj.handleImg = handleImg;

exportObj.configAll = configAll;

exportObj.download = download;

exportObj.async = async;

module.exports = exportObj;