const Transport = require('winston-transport')
const request = require('request')

module.exports = class LogentriesTransport extends Transport {
  constructor (opts) {
    super(opts)

    this.headers = { 'Content-Type': 'application/json' }
    this.url = `https://webhook.logentries.com/noformat/logs/${opts.token}`
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
