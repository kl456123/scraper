var request = require('request');
var cheerio = require('cheerio');
var handleUrl = require('./util.js').handleUrl;
var writeFile = require('./util.js').writeFile;

var dbUtils = require('./db_utils/utils.js');
var insertDocument = dbUtils.insertDocument;



// handle GBK
var iconv = require('iconv-lite');
// try to scrapy the page from http://xiaohua.zol.com.cn/detail31/30142.html
// var urlSrc = 'http://xiaohua.zol.com.cn/detail31/30142.html';
var path = './GetData/mock.json';

var getJokes = function(urlSrc) {
	var option = {
		url: urlSrc,
		encoding: null
	};
	return new Promise(function(resolve, reject) {

		request(option, function(error, res, body) {
			var temp = iconv.decode(body, 'gbk');
			if (!error && res.statusCode === 200) {

				var url = handlePage(temp, urlSrc);

				resolve(url);
			} else {

				reject(error);
			}
		});
	});
};


function handlePage(page, urlSrc) {

	var $ = cheerio.load(page);
	// get url of next page .
	var next = $('.next a').toArray();
	var source = $('.article-source').text();
	var title = $('.article-title').text();
	var content = $('.article-text').text();
	var saveObj = {};
	saveObj.title = title;
	saveObj.content = content;
	saveObj.source = source;
	insertDocument(saveObj)
		.then(function() {
			console.log('success to save!');
		})
		.catch(function(error) {
			console.log(error);
		});
	// saveToJSON(saveObj);
	var URL = handleUrl(next[0].attribs.href, urlSrc);

	return URL;
}


function saveToJSON(saveObj) {

	var str = JSON.stringify(saveObj);
	writeFile(path, str)
		.then(function() {
			console.log('save success!');
		})
		.catch(function(error) {
			console.log(error);
		});
}


module.exports = getJokes;