const cluster = require('cluster');
const numCPUs = require('os').cpus().length;



if (cluster.isMaster) {
  console.log('I am master');
  cluster.fork()
    .on('online', function() {
      console.log('asaf');
    });
  cluster.fork();

  /*for (let id in cluster.workers) {
    console.log(id);
    cluster.workers[id].disconnect();
  }*/
} else if (cluster.isWorker) {
  // console.log(cluster.worker.exit);
  // throw new Error('asfafas');
  /*  process.disconnect();
    console.log(`I am worker #${cluster.worker.id}`);
    process.on('disconnect', function() {
      console.log(cluster.worker.id + ' process exit');
    });*/
}