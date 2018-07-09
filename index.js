var winston = require('winston')
const moment = require('moment')
let LogentriesTransport = require('./logentries')

const timestamp = function () {
  return moment().format('DD-MM-YYYY HH:mm:ss').trim()
}

const myFormat = winston.format.printf(info => {
  let tags = info.tags

  if (info.error !== undefined) {
    info = {
      message: JSON.stringify(info.error),
      level: info.level
    }
  }

  return tags !== undefined
    ? `[${timestamp()}] ${info.level} ${info.message} [${tags}]`
    : `[${timestamp()}] ${info.level} ${info.message}`
})

let transports = [
  new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.align(),
      myFormat
    ),
    handleExceptions: true
  })
]

if (process.env.NODE_ENV === 'production') {
  transports.push(
    new LogentriesTransport({
      level: 'info',
      handleExceptions: true
    })
  )
}

const logger = winston.createLogger({ transports: transports })

function wrapper (level) {
  return (message, tags) => {
    if (tags) {
      logger[level]({ message: message, tags: tags })
    } else {
      logger[level](message)
    }
  }
}

module.exports.error = wrapper('info')
module.exports.warn = wrapper('warn')
module.exports.info = wrapper('info')
module.exports.verbose = wrapper('verbose')
module.exports.debug = wrapper('debug')
