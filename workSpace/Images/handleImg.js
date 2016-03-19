var gm = require('gm');
var fs = require('fs');
// gm('./images/0drsk5ccgda186.jpg')
// 	.size(function(err, size) {
// 		if (err) {
// 			console.log(err);
// 			fs.unlink('./images/0drsk5ccgda186.jpg');
// 			return;
// 		}
// 		console.log('width:' + size.width);
// 		console.log('height:' + size.height);
// 		// fs.unlink('./images/0-3iPJWn.jpg');
// 	});
//
var dir = '../data/images/';
var files = fs.readdirSync(dir);
// console.log(files[0]);
// files.forEach(function(file) {
// 	// console.log(file);
// 	var path = './test/' + file;
// 	gm(path)
// 		.size(function(err, size) {
// 			if (err) {
// 				fs.unlink(path);
// 				return;
// 			}
// 			// if (size.width >= 200 && size.height >= 300) {
// 			// 	// var newPath = './dist' + file;
// 			// 	// fs.rename(path, newPath, function(err) {
// 			// 	// 	if (err) {
// 			// 	// 		console.log(err);
// 			// 	// 	}
// 			// 	// });
// 			// 	console.log(file);
// 			// }
// 		});
// });

var num = 0;

function test(path) {
	gm(path)
		.size(function(err, size) {
			if (err) {
				fs.unlink(path, function(err) {
					num++;
				});
				return;
			}
			console.log('width:' + size.width);
			console.log('height:' + size.height);
		});
}
// var temp = './test/' + '1_1022211021Y39.jpg';
// test(temp);
//
files.forEach(function(file) {
	test(dir + file);
});