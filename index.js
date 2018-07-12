var winston = require('winston')
const moment = require('moment')
let LogentriesTransport = require('./logentries')
let logger = null

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

module.exports.getLogger = function (token) {
  if (logger !== null) {
    return logger
  }

  if (token !== undefined) {
    transports.push(
      new LogentriesTransport({
        level: 'info',
        handleExceptions: true,
        token: token
      })
    )
  }

  logger = winston.createLogger({ transports: transports })

  function wrapper (level) {
    return (message, tags) => {
      if (tags) {
        logger[level]({ message: message, tags: tags })
      } else {
        logger[level](message)
      }
    }
  }

  return {
    error: wrapper('error'),
    warn: wrapper('warn'),
    info: wrapper('info'),
    verbose: wrapper('verbose'),
    debug: wrapper('debug')
  }
}
