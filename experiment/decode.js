var iconv = require('iconv-lite');
var http = require('http');
var request = require('request');


var url = 'http://xiaohua.zol.com.cn/detail31/30142.html';
var option = {
	url: url,
	encoding: null
};

// http test success!
// var data = "";
// var req = http.request(url, function(res) {
// 	res.setEncoding('binary');
// 	res.on('data', function(chunk) {
// 		data += chunk;
// 	});
// 	res.on('end', function() {
// 		var buf = new Buffer(data, 'binary'); //这一步不可省略
// 		var str = iconv.decode(buf, 'GBK'); //将GBK编码的字符转换成utf8的
// 		console.log(str);
// 	});
// 	res.on('error', function(error) {
// 		console.log(error);
// 	})
// });

// req.end();
// 
// 
//local test 
//
var str = "内存编码表示";

var buf = iconv.encode(str, 'gbk');
var str1 = iconv.decode(buf, 'utf8');
var buf1 = iconv.encode(str1, 'gbk');
var str2 = iconv.decode(buf1, 'utf8');
console.log(str1);
console.log(str2);
console.log(iconv.decode(buf, 'gbk'));
// 
// 
// 
// request test 
request(option, function(error, res, body) {
	var str = iconv.decode(body, 'gbk');
	console.log(str);
});