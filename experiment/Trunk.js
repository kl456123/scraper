// Thunk convertion
// ES5
function Thunk(fn) {
  return function() {
    var args = Array.prototype.slice.apply(arguments);
    return function(callback) {
      args.push(callback);
      return fn.apply(this, args);
    };
  };
}

function f(num, callback) {
  callback(num);
}

let log = console.log;

let ft = Thunk(f);
ft(2)(log);