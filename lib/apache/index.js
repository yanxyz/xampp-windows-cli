const config = require('../config')
const { spawn } = require('child_process')

exports.start = async function () {
  stop().on('close', (code) => {
    if (code > 0) return
    const exe = config.getPath('xampp-control.exe')
    spawn('cmd.exe', ['/c', 'start', exe], { stdio: 'inherit' })
  })
}

exports.stop = stop

function stop() {
  const bat = config.getPath('apache_stop.bat')
  return spawn('cmd.exe', ['/c', 'start', '/b', bat])
}
