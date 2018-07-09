const Transport = require('winston-transport')
const request = require('request')

const TOKEN = process.env.LOGGER_TOKEN

module.exports = class LogentriesTransport extends Transport {
  constructor (opts) {
    super(opts)

    if (TOKEN === undefined) {
      console.error('Environmental variable \'LOGGER_TOKEN\' not defined. Exiting.')
      process.exit(1)
    }

    this.headers = { 'Content-Type': 'application/json' }
    this.url = `https://webhook.logentries.com/noformat/logs/${TOKEN}`
  }

  log (info, callback) {
    setImmediate(() => {
      this.emit('logged', info)
    })

    if (info.error !== undefined) {
      info = {
        level: info.level,
        message: info.error
      }
    }

    request.post({
      headers: this.headers,
      url: this.url,
      json: info,
      callback: callback
    })
  }
}
