const TOKEN = process.argv[2]

if (TOKEN === undefined) {
  console.log('Missing argument: token')
  process.exit(1)
}

const logger = require('./index').getLogger(TOKEN)

logger.info('without tags')
logger.info('with tag', [ 'myTag' ])
logger.info('with multiple tags', [ 'myTag', 'myOtherTag' ])
logger.error('Simulating an error', 'stupid')

require('./index').getLogger().debug('No new instance of logger was created')

process.exit(0)
