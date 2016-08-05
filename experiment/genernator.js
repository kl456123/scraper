let a = [2, 3];
let b = [4, 5];
// Array.prototype.push.apply(a, b);
a.push.apply(a, b);
console.log(a);