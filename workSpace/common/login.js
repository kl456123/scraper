#!/usr/bin/env node

var request = require('request');
var qs = require('querystring');
var cheerio = require('cheerio');
const readline = require('readline');
var fs = require('fs');
var zlib = require('zlib');


var writeFile = require('./util.js').writeFile;
var downloadFile = require('./util.js').downloadFile;
var configAll = require('./util.js').configAll;



// load options
var options = require('./headers/options.js');
var options_get = options.options_get;
var options_post = options.options_post;



// var url = 'https://www.zhihu.com/';
var url = 'https://www.zhihu.com/topic/19570168';
var captcha_url = 'https://www.zhihu.com/captcha.gif';

options_get.url = url;

// search Cookies
// tell if Cookie is existing
var files = fs.readdirSync('./Cookie');
var _Cookies = [];

files.forEach(function(one) {

	try {
		_CookiesOne = fs.readFileSync('./Cookie/' + one);
		_Cookies.push(_CookiesOne);

	} catch (err) {

		console.log(err);
	}
});

if (_Cookies.length !== 0) {

	options_get.headers['Cookie'] = _Cookies;

	request(options_get, function(err, res, body) {

		writeFile('zhihu.html', body)
			.then(function() {
				console.log('login!');
			})
			.catch(function(err) {
				console.log(err);
			});
	});
} else {

	// it is unnecessary to check _xsrf
	// var _xsrf_;
	// try {
	// 	_xsrf_ = fs.readdirSync('./_xsrf');
	// } catch (err) {
	// 	console.log(err);
	// }
	// if (_xsrf_ !== undefined) {

	// } else {

	request.get(url, function(err, res, body) {
		// find _xsrf

		var $ = cheerio.load(body);

		var _xsrf = $("*[name='_xsrf']").val();

		var conf = configAll();

		conf['_xsrf'] = _xsrf;

		// save _xsrf
		writeFile('./PostReq/_xsrf', _xsrf.toString())

		.then(function() {

				console.log('save cookie!');
			})
			.catch(function(err) {

				console.log(err);
			});


		// get captcha
		downloadFile(captcha_url, 'captcha.gif', function(err, res) {

			if (err) {

				console.log(err);

				return;
			}


		});

		const rl = readline.createInterface({

			input: process.stdin,

			output: process.stdout

		});

		rl.question('Please scanf your captcha? ', (answer) => {

			var captcha = answer;
			conf['captcha'] = captcha;

			// stringify conf
			var content = qs.stringify(conf);
			// console.log(conf);
			// set options 

			// var temp = fs.readFileSync('cookie', 'utf-8');
			// // console.log(temp);
			// if (temp !== undefined) {
			// 	options.headers['Cookie'] = temp;
			// }
			// console.log(options.headers['Cookie']);
			// 



			options_post.headers['Content-Length'] = content.length;

			options_post.body = content;

			var Cookie;

			// post data 
			request(options_post, function(err, res, body) {

				var data = JSON.parse(body);

				msg = data['msg'] || data['data'];

				console.log(data);


				Cookie = res.headers['set-cookie'];

				list(Cookie);
				// save cookie
				// if (temp == undefined) {

				Cookie.forEach(function(item, index) {

					writeFile('./Cookie/' + index, item)

					.then(function() {
							console.log(index + ':save cookie!');
						})
						.catch(function(err) {
							console.log(err);
						});
				});

				// }

				options_get.headers['Cookie'] = Cookie;

				// options_get.body = qs.stringify(temp);
				request(options_get, function(err, res, body) {

					writeFile('zhihu.html', body)

					.then(function() {
							console.log('login!');
						})
						.catch(function(err) {
							console.log(err);
						});
				});
			});

			rl.close();
		});

	});
	// }

}



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


//  Let me think about it later....
// get_xsrf()
// 	.then(function(_xsrf) {
// 		return _xsrf;
// 	}, function() {
// 		request.get(url, function(err, res, body) {
// 			var $ = cheerio.load(body);
// 			var _xsrf = $("*[name='_xsrf']").val();

// 			var conf = configAll();
// 			conf['_xsrf'] = _xsrf;

// 			// save _xsrf
// 			writeFile('_xsrf', _xsrf.toString())
// 				.then(function() {
// 					console.log('save cookie!');
// 				})
// 				.catch(function(err) {
// 					console.log(err);
// 				});
// 				return 
// 		});
// 	})
// 	.then(function() {

// 	})