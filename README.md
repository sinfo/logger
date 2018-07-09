# logger
Universal logger for all SINFO's applications

## Usage

### Dev

```javascript
const logger = require('logger').getLogger()

// multiple levels
logger.error('This is an error message')
logger.warn('This is a warning message')
logger.info('This is an info message')
logger.verbose('This is a verbose message')
logger.debug('This is a debug message')

// add single tag
logger.info('One tag', 'myTag')
logger.info('Multiple tags', ['myTag', 'myOtherTag'])
```

### Production

Production mode still displays on console, but just error, warn and info levels are sent to logentries

```javascript
const logger = require('logger').getLogger('this-is-my-logentries-token')

// everything equal to dev mode, but now the logger will send http POST
// requests to logentries
```
