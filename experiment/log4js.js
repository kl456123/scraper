let log4js = require("log4js");

/*let logger = log4js.getLogger();
logger.debug("some debug message");*/

let logger = log4js.getLogger('cheese');
logger.setLevel('ALL');

logger.trace('Enter trace testing');
logger.debug('Got cheese');
logger.info('Cheese is Gouda');
logger.warn('cheese is quiet smelly.');
logger.error('cheese is too ripe');
logger.fatal('cheese was breeding ground for listeria.');