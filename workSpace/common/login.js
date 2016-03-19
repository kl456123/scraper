#!/usr/bin/env node

var request = require('request');
var qs = require('querystring');
var cheerio = require('cheerio');
const readline = require('readline');
var fs = require('fs');
var zlib = require('zlib');


var writeFile = require('../../utils/ioUtils.js').writeFile;
var download = require('../../utils/utils.js').download;
var configAll = require('../../utils/utils.js').configAll;



// load options
var options = require('../../data/headers/options.js');
var options_get = options.options_get;
var options_post = options.options_post;



var url = 'https://www.zhihu.com';
var captcha_url = 'https://www.zhihu.com/captcha.gif';
var conf = {};
options_get.url = url;

// search Cookies
// tell if Cookie is existing
var files = fs.readdirSync('../../data/cookie');
var _Cookies = [];

files.forEach(function(one) {

	try {
		_CookiesOne = fs.readFileSync('../../data/cookie/' + one);
		_Cookies.push(_CookiesOne);

	} catch (err) {

		console.log(err.stack);
	}
});

console.log(_Cookies.length);
login(_Cookies)

.then(function(cookies) {
		console.log('have cookies!');
		return cookies;

	}, function() {
		return getPromise();
	})
	.then(function(body) {
		if (_Cookies.length !== 0) {
			return;
		}

		// find _xsrf
		var $ = cheerio.load(body);
		// console.log($);
		var _xsrf = $("*[name='_xsrf']").val();
		console.log(_xsrf);
		conf = configAll();

		conf['_xsrf'] = _xsrf;

		// save _xsrf
		writeFile('../../data/postReq/_xsrf', _xsrf)

		.then(function() {

				console.log('save _xsrf!');
			})
			.catch(function(err) {

				console.log(err.stack);
			});


		// get captcha
		download(captcha_url, '../../data/captcha/captcha.gif')
			.catch(function(error) {
				console.log(error.stack);
			});

		return ansPromise();

	})
	.then(function(answer) {
		if (_Cookies.length !== 0) {
			return;
		}
		var captcha = answer;
		conf['captcha'] = captcha;

		// stringify conf
		var content = qs.stringify(conf);

		options_post.headers['Content-Length'] = content.length;

		options_post.body = content;
		return postPromise(options_post);

	})
	.then(function(res) {

		if (_Cookies.length !== 0) {
			return _Cookies;
		}
		// post data

		var body = res.body;
		var Cookie;
		var data = JSON.parse(body);

		msg = data['msg'] || data['data'];

		console.log(data);


		Cookie = res.headers['set-cookie'];

		list(Cookie);

		Cookie.forEach(function(item, index) {

			writeFile('../../data/cookie/' + index, item)

			.then(function() {
					console.log(index + ':save cookie!');
				})
				.catch(function(err) {
					console.log(err.stack);
				});
		});
		return Cookie;

	})
	.then(function(cookies) {

		options_get.headers['Cookie'] = cookies;

		request.get(options_get, function(err, res, body) {

			writeFile('../../data/html/zhihu.html', body)
				.then(function() {
					console.log('login!');
				})
				.catch(function(err) {
					console.log(err.stack);
				});
		});
	})
	.catch(function(err) {
		console.log(err.stack);
	});



// get _xsrf by promise
function get_xsrf() {

	return new Promise(function(resolve, reject) {

		var _xsrf = fs.readFileSync('_xsrf', 'utf-8');

		if (_xsrf == undefined) {

			reject();

		} else {

			resolve(_xsrf);

		}
	});
}


// list Cookie
function list(Cookie) {

	Cookie.forEach(function(one) {

		console.log(one);

	});

	console.log(Cookie.length);
}



//get cookies by Promise
function login(cookies) {
	return new Promise(function(resolve, reject) {
		if (cookies.length == 0) {
			reject();
		} else {
			resolve(cookies);
		}
	});
};


function getPromise() {
	return new Promise(function(resolve, reject) {
		request.get(url, function(err, res, body) {
			if (err) {
				reject(err);
				return;
			}
			resolve(body);
		});
	});
}

function postPromise(options) {
	return new Promise(function(resolve, reject) {
		request(options, function(err, res, body) {
			if (err) {
				reject(err);
				return;
			}
			resolve(res);
		});
	});
}


function ansPromise() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	return new Promise(function(resolve, reject) {
		rl.question('Please scanf your captcha? ', (answer) => {
			resolve(answer);
			rl.close();
		});

	});
}

// function getCookies() {
// 	getPromise()
// 		.then(function(body) {
// 			// find _xsrf

// 			var $ = cheerio.load(body);

// 			var _xsrf = $("*[name='_xsrf']").val();

// 			var conf = configAll();

// 			conf['_xsrf'] = _xsrf;
// 			console.log(_xsrf);
// 			// save _xsrf
// 			writeFile('../../data/postReq/_xsrf', _xsrf.toString())

// 			.then(function() {

// 					console.log('save _xsrf!');
// 				})
// 				.catch(function(err) {

// 					console.log(err.stack);
// 				});


// 			// get captcha
// 			download(captcha_url, '../../data/captcha/captcha.gif')
// 				.catch(function(error) {
// 					console.log(error.stack);
// 				});

// 			const rl = readline.createInterface({

// 				input: process.stdin,

// 				output: process.stdout

// 			});

// 			rl.question('Please scanf your captcha? ', (answer) => {

// 				var captcha = answer;
// 				conf['captcha'] = captcha;

// 				// stringify conf
// 				var content = qs.stringify(conf);

// 				options_post.headers['Content-Length'] = content.length;

// 				options_post.body = content;

// 				var Cookie;

// 				// post data
// 				request(options_post, function(err, res, body) {

// 					var data = JSON.parse(body);

// 					msg = data['msg'] || data['data'];

// 					console.log(data);


// 					Cookie = res.headers['set-cookie'];

// 					list(Cookie);

// 					Cookie.forEach(function(item, index) {

// 						writeFile('../../data/cookie/' + index, item)

// 						.then(function() {
// 								console.log(index + ':save cookie!');
// 							})
// 							.catch(function(err) {
// 								console.log(err.stack);
// 							});
// 					});
// 					return Cookie;

// 				});

// 				rl.close();
// 			});
// 		})
// 		.catch(function(err) {
// 			console.log(err);
// 		});


// }


// coding by genernator and promise
//
// function login * () {
// 	if (_Cookies.length == 0) {
// 		var cookies = yield getCookies();
// 	} else {

// 	}
// }