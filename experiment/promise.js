const readline = require('readline');



var p = function() {
  return new Promise(function(resolve, reject) {
    resolve(2);
  });
};

// p().then(function(num) {
//     console.log(num);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

const rl = readline.createInterface({

  input: process.stdin,

  output: process.stdout

});

function interfaces() {
  rl.question('Please scanf your captcha? ', (answer) => {
    console.log(answer);
    rl.close();
  });
}

p()
  .then(function(num) {
    interfaces();
  })
  .then(function() {
    console.log('asfasa');
  });