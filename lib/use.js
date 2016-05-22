'use strict'

const config = require('./config')
const ls = require('./ls')

module.exports = function (version) {
  const cfg = config.get(version, true)
  console.log('Now using XAMPP', version)
  console.log()
  ls.print(cfg)
}
