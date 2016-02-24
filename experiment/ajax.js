var jquery = require('jquery');

console.log(jquery());
// console.log($);
jquery.get('http://wwww.baidu.com/', function(data) {
		/*optional stuff to do after success */
		console.log(data);
	})
	.error(function(error) {
		/* Act on the event */
		console.log(error);
	});