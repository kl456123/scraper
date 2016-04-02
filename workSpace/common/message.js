/**
 * I want to maintain a message by using a queue.
 */

function Queue() {
  this.data = [];
}

Queue.prototype.push = function(msg) {
  this.data.push(msg);
};
Queue.prototype.getLength = function() {
  return this.data.length;
};
Queue.prototype.isEmpty = function() {
  if (this.data.length === 0) {
    return true;
  }
  return false;
};
Queue.prototype.pop = function() {
  return this.data.shift();
};
Queue.prototype.pushAll = function(arrMsg) {
  this.data = this.data.concat(arrMsg);
};

module.exports = Queue;