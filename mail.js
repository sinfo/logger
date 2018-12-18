const Transport = require('winston-transport')
const DOMAIN = 'sinfo.org'
const prettyjson = require('prettyjson')

function send (mailgun, app, message, raw) {
  if (mailgun === undefined) {
    throw new Error('Mailgun not initialized')
  }

  let data = {
    from: 'Mailgun <mailgun@sinfo.org>',
    to: 'devteam@sinfo.org',
    subject: `[Log alert] ${app}`,
    text: prettyjson.render(message.raw)
  }

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      throw error
    }
  })
}

module.exports = class MailgunTransport extends Transport {
  constructor (opts) {
    super(opts)

    this.mailgun = require('mailgun-js')({
      apiKey: opts.apiKey,
      domain: DOMAIN
    })

    this.app = opts.app
  }

  log (info, callback) {
    setImmediate(() => {
      this.emit('logged', info)
    })

    send(this.mailgun, this.app, info)

    callback()
  }
}
