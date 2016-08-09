import redis from 'redis';

let client = redis.createClient();

/*client.sadd('urls', ['asfd', 'asfasfgas'], function(err, res) {
  if (err) {
    console.log(err);
  }
  console.log(res);
});*/

function sadd(setName, urls) {
  return new Promise(function(resolve, reject) {
    client.sadd(setName, urls, function(err, res) {
      /*client.scard(setName, function(err, len) {
        resolve(len);
        client.quit();
      });*/
      client.quit();
    });
    // });
  });
}
client.quit();