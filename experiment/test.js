// var exportObj = require('./getURL.js');
// var getImg = require('./getImg.js');
var fs = require('fs');
// var asyGetURL = exportObj.asyGetURL;

// var src = "http://bizhi.sogou.com/cate/index/4?f=nav";
// asyGetURL(src, function(url) {
// 	getImg(url)
// 		.catch(function(err) {
// 			console.log(err);
// 		});
// });
//
// var temp = fs.readFileSync('cookie', 'utf-8');

// console.log(temp);
//  pass value on
var str = 'hello world';
var str2 = str;
str2 = 'a';
console.log(str);
console.log(str2);


function setName(obj) {
  obj.name = 'breakpoint';
  obj = {};
  obj.name = 'asfas';
}
var person = {};
setName(person);
console.log(person.name);