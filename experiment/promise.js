// const readline = require('readline');



// var p = function() {
//   return new Promise(function(resolve, reject) {
//     resolve(2);
//   });
// };

// // p().then(function(num) {
// //     console.log(num);
// //   })
// //   .catch(function(err) {
// //     console.log(err);
// //   });

// const rl = readline.createInterface({

//   input: process.stdin,

//   output: process.stdout

// });

// function interfaces() {
//   rl.question('Please scanf your captcha? ', (answer) => {
//     console.log(answer);
//     rl.close();
//   });
// }

// p()
//   .then(function(num) {
//     interfaces();
//   })
//   .then(function() {
//     console.log('asfasa');
//   });
import request from 'request';

import exportObj from '../data/headers/options.js';

import {
  writeFile
} from '../utils/ioUtils.js';

let options_get = exportObj.options_get;
options_get.url = 'https://api.github.com/search/users?q=kl456123';

// let writeFile = exp.writeFile;
// console.log(writeFile);



// for check option legel
let search = function(options) {
  return new Promise(function(resolve, reject) {
    if (options.url == undefined) {
      reject(new Error('url is undefined\n'));
      return;
    }
    resolve(options);
  });
};


let getResult = function(options_get) {
  return new Promise(function(resolve, reject) {
    request.get(options_get, function(err, res, body) {
      if (err) {
        reject(err);
        return;
      }
      resolve(body);
    });
  });
};


/*search(options_get)
  .then(function(options) {
    setTimeout(function() {
      console.log('asfasf');
    }, 5000);
    return getResult(options);
  })
  .then(function(data) {
    return writeFile('../data/text/mock.txt', data);
  })
  .then(function() {
    console.log('success');
  })
  .catch(function(err) {
    console.log(err);
  });*/

// using co lib instead of Promise

import co from 'co';

let g = function*(options) {
  let data = yield getResult(options);
  yield writeFile('../data/text/mock.txt', data);
}

// co(g);


// error event

let fn = function() {
  return new Promise(function(resovle, reject) {
    throw new Error("inner Error");
    resove();
  });
};

/*try {
  fn()
    .then()
    .catch(function(error) {
      console.log(error);
    });
} catch (error) {
  console.log(error);
}*/

// first execute syncous code and then add async into event loop.
setTimeout(function() {
  console.log("big big world");
}, 0);
for (let i = 0; i < 10; i++)
  console.log(i);