const fs = require('fs-extra')
const config = require('../config')

let template

module.exports = async function (opts) {
  if (!template) {
    template = await fs.readFile(config.vhostConf, 'utf8')
  }

  const conf = template.replace(/{{([a-z]+)}}/g, (m, p) => opts[p])

  if (opts.both) {
    return conf + '\n\n' + modifyPort(conf)
  }

  if (opts.ssl) {
    return modifyPort(conf)
  }

  return conf
}

function modifyPort(conf) {
  return conf.replace(':80>', ':443>')
}
