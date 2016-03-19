var co = require('co');


var p1 = function() {
  return new Promise(function(resolve, reject) {
    resolve(1);
    reject(2);
    console.log('hello world!');
  });
};

var p2 = function() {
  return new Promise(function(resolve, reject) {
    resolve(true);
    reject(false);
    console.log('hello world!');
  });
};


var g = function*() {
  yield p1()
    .then(function(num) {
      console.log(num);
      return num;
    })
    .then(function(num) {
      console.log(num);
      setTimeout(function() {
        console.log('asfasag');
      }, 0);
    });
  yield p2()
    .then(function(bool) {
      console.log(bool);
    })
    .catch(function(err) {
      console.log(err);
    });
};


var _g = function() {
  p1()
    .then(function(num) {
      console.log(num);
    })
    .catch(function(err) {
      console.log(err);
    });
  p2()
    .then(function(bool) {
      console.log(bool);
    })
    .catch(function(err) {
      console.log(err);
    });
};
// co(g);
// _g();
//


function* g2() {
  var num = yield Promise.resolve(2);
  console.log(num);
  return 3;
}

function _g2() {
  var num = Promise.resolve(2);
  console.log(num);
}
// co(g2);
// _g2();
// console.log(num);
//
//
// p1()
//   .then(function(num) {
//     console.log(num);
//     setTimeout(function() {
//       console.log('asfafa');
//     }, 0);
//     return num;
//   })
//   .then(function(num) {
//     console.log('heafaffw');
//   });


p1()
  .then(function(num) {
    console.log('asfas');
  })
  .then(function(num) {
    console.log('asfagsagas');
  });

console.log('aaaaaaaaaaaaaaa');

console.log(typeof []);