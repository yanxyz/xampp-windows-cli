'use strict'

const childProcess = require('child_process')
const path = require('path')
const config = require('./config')

function run () {
  const script = path.join(__dirname, 'restart.bat')
  const child = childProcess.execFile(script, ['/c'], {
    cwd: config.installDir
  })
  child.stdin.unref()
  child.stdout.unref()
  child.stderr.unref()
}

module.exports = run

// test
if (!module.parent) {
  run()
}
