class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.sayName = function() {
  console.log('My name is ' + this.name);
};

let dog = new Dog('hell');
let person = {};
person.name = 'breakpoint';

person.dog = dog;

person.dog.sayName();