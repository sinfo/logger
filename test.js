const logger = require('./index')

logger.info('info message without tags')
logger.info('info message with tag', [ 'myTag' ])
logger.info('info message with multiple tags', [ 'myTag', 'myOtherTag' ])
