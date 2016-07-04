import request from 'request';
import cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';
import co from 'co';

let handleUrl = require('../../utils/utils.js').handleUrl;

let proRequest = require('../../utils/utils.js').proRequest;


let getURL = function(options, urlSelector) {
	return new Promise(function(resolve, reject) {

		request(options, function(error, response, data) {
			if (!error) {
				// console.log(data);
				var temp;
				if (typeof options === 'object') {
					temp = options.url;
				} else {
					temp = options;
				}
				var urls = parse(data, temp, urlSelector).slice(0);
				resolve(urls);
			} else {
				reject(error);
			}
		});
	});
};


// I think it is not suit here using co module...
// function getURL(urlSrc) {
// 	return co(function*() {
// 		var urls = yield proRequest(urlSrc)
// 			.then(function(obj) {
// 				var urls = parse(obj.data, obj.requrl).slice(0);
// 				return urls;
// 			})
// 			.catch(function(err) {
// 				console.log(err);
// 			});
// 		return urls;
// 	});
// }


function parse(data, url, urlSelector) {
	// default scrapy link
	if (urlSelector === undefined) {
		urlSelector = 'a';
	}
	let urls = [];
	let $ = cheerio.load(data);
	let a = $(urlSelector).toArray();
	a.forEach(function(aOne) {
		let href = aOne.attribs.href;
		let pre = href;
		href = handleUrl(href, url);


		if (href === undefined || href[0] !== 'h') {
			return;
		}
		/*		if (href[0] !== 'h') {
					console.log('pre: ' + pre + ' url: ' + url);
					console.log('href: ' + href);
				}*/
		// console.log(href);
		urls.push(href);
	});
	return urls;

}



let exoprtObj = {};
exoprtObj.getURL = getURL;
exoprtObj.asyGetURL = asyGetURL;
module.exports = exoprtObj;



//
//
let allURL = [];
// test queen
//


// // var result = [];

function _asyGetURL(options, urlSelector, callback) {
	// console.log(allURL.length);
	if (allURL.length === 0) {
		console.log('url is empty');
		return;
	}
	var src = options.url;
	callback(src);
	allURL.shift();
	var data = src.toString() + '\n';
	fs.appendFile('../../data/url.json', data, 'utf8', function(error) {
		if (error) {
			throw error;
		}
	});
	getURL(options, urlSelector)
		.then(function(nextURL) {
			allURL = allURL.concat(nextURL);
			var url = allURL[0];
			options.url = url;
			_asyGetURL(options, urlSelector, callback);
		})
		.catch(function(error) {
			// console.log(error);
			_asyGetURL(allURL[0], callback);
		});
}


//
function asyGetURL(options, urlSelector, callback) {
	var src = options.url;
	allURL.push(src);
	_asyGetURL(options, urlSelector, callback);
}
//
//
// Promise
// getURL(src)
// 	.then(function(urls) {
// 		console.log(urls.length);
// 		urls.forEach(function(urlOne) {
// 			fs.appendFile('url.json', urlOne + '\n', 'utf8', function(error) {
// 				if (error)
// 					throw error;
// 			});
// 		});
// 	}, function(error) {
// 		console.log(error);
// 	});