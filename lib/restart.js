'use strict'

const childProcess = require('child_process')
const path = require('path')
const config = require('./config')

function run (stop) {
  stop = stop ? 'yes' : 'no'
  const script = path.join(__dirname, 'restart.bat')
  const child = childProcess.execFile(script, ['/c', stop], {
    cwd: config.installDir
  }, (error, stdout, stderr) => {
    if (error) throw error
    // console.log(stdout)
    // console.log(stderr)
  })
  child.stdin.unref()
  child.stdout.unref()
  child.stderr.unref()
}

module.exports = run

// test
if (!module.parent) {
  run(process.argv[2])
}
