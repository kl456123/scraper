// import Animal from './_es6.js';
let Animal = require('./_es6.js');

class Dog extends Animal {
  constructor(name) {
    super();
    this.name = name;
  }
  eat(food) {
    console.log(this.name + " can eat " + food);
  }
}

let dog = new Dog("kitty");
dog.eat("scfa");
dog.run();