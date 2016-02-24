// var demo = function(num) {
// 	return new Promise(function(resolve, reject) {
// 		if (num > 0) {
// 			resolve(true, num);
// 		} else {
// 			reject(false, num);
// 		}
// 	});
// };

// demo(5)
// 	.then(function(result, num) {
// 		// console.log(num);
// 		return demo(-2);
// 	})
// 	.then(function(test) {
// 		console.log(test);
// 	})
// 	.catch(function(result, num) {
// 		console.log(result);
// 		console.log(num);
// 	});

// var co = require('co');
// // practice co module
// // 
// // 
// var p1 = Promise.resolve("hello");
// var p2 = Promise.resolve("world");


// co(function*() {
// 		var str1 = yield p1;
// 		var str2 = yield p2;
// 		console.log(str1);
// 		return str1 + str2;
// 	})
// 	.then(function(str) {
// 		console.log(str);
// 	});

// function error() {
// 	throw new Error("dfsgsg");
// }
// var test = function() {
// 	return new Promise(function(resolve, reject) {

// 		resolve();
// 		reject("asfasfasgg");
// 	});
// };

// test()
// 	.then(function(msg) {
// 		console.log(msg);
// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 	});



// temp test here
// var temp = [1, 2, 3, 4, 5];

// temp.forEach(function(one) {
// 	if (one == 4) {
// 		throw new Error("it is four!");
// 	} else {
// 		console.log(one);
// 	}
// });
// 
var p1 = new Promise(function(resolve, reject) {
	reject("sdfsaf");
	console.log("sdgs");
});

p1
	.then(function() {
		throw new Error("fdsgsdgds");
	})
	.catch(function(err) {
		console.log(err);
	});