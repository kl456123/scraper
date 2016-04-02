var redis = require('redis');
var client = redis.createClient(); //creates a new client

client.on('connect', function() {
  // client.set('framework', 'AngularJS');
  client.get('framework', function(err, reply) {
    console.log(reply);
});
  // console.log('connected');
});