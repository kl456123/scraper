// The file is just used for getting lots of Jokes from the web .
// And I also want to test my module file--getJokes.js
// to see if it is useful for me .



////////////////////////////////////////////////
// issue:How can I carry on the last schedule //
//  to make data not to be repeated  ?        //
////////////////////////////////////////////////



var getJokes = require('./getJokes.js');



// The URL of the web you want to scrapy.
var url = 'http://xiaohua.zol.com.cn/detail31/30142.html';

var count = 0;


// Recursion is convenient but not the best.
// because it can easily cause stack overflow.
// Then I want to change it by recurrence.
function recursion(URL) {

  if (URL === undefined) {
    return;
  }
  getJokes(URL)
    .then(function(next) {
      count++;
      console.log(count);
      recursion(next);
    })
    .catch(function(error) {
      console.log(error.stack);
    });
}

recursion(url);