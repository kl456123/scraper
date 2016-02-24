var fs = require('fs');

var start = process.hrtime();

for (var i = 0; i < 10; ++i) {
	(function(id) {
		fs.readdir('.', function() {
			var end = process.hrtime(start);
			console.log(end[0] + end[1] / 1e9);
			// sleep(1000, end[0] + end[1] / 1e9);
		});
	})(i)
}


function sleep(time, data) {
	setTimeout(function() {
		console.log(data);
	}, time);
}