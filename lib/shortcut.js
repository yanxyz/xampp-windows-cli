'use strict'

const path = require('path')
const exec = require('child_process').execSync
const config = require('./config').get()

module.exports = function () {
  const vbs = path.join(__dirname, 'shortcut.vbs')
  exec(`"${vbs}" "${config.panel.exe}" "${config.shortcut}"`)
}
