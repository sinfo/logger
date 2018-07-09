const logger = require('./index').getLogger()

logger.info('without tags')
logger.info('with tag', [ 'myTag' ])
logger.info('with multiple tags', [ 'myTag', 'myOtherTag' ])
