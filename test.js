const TOKEN = process.argv[2]
const APIKEY = process.argv[3]
const APP = process.argv[4]

const logger = require('./index').getLogger(TOKEN, APIKEY, APP)

logger.info('without tags')
logger.info('with tag', 'myTag')
logger.info('with multiple tags', [ 'myTag', 'myOtherTag' ])
logger.error('Simulating an error', 'stupid')
logger.error({ bizarre: 'Simulating an error' }, 'stupid')

require('./index').getLogger().debug('No new instance of logger was created', 'example')

setTimeout(() => console.log('done!'), 5000)
