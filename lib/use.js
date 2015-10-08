'use strict'

const config = require('./config')
const ls = require('./ls')

module.exports = function (version) {
  const cfg = config.get(version, true)
  console.log('Now using xampp', version)
  ls.print(cfg)
}
