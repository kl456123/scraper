var BloomFilter = require('bloomfilter').BloomFilter;

var bloom = new BloomFilter(
  32 * 256,
  16
);

bloom.add('foo');
bloom.add('bar');


console.log(bloom.test('foo'));
console.log(bloom.test('bar'));
console.log(bloom.test('blah'));