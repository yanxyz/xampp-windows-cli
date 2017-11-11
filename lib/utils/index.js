const { promisify } = require('util')
const cp = require('child_process')

const spawn = promisify(cp.spawn)
exports.execFile = promisify(cp.execFile)

exports.runVbs = function (script, args = [], opts) {
  args.unshift(script, '//Nologo')
  return spawn('cscript.exe', args, Object.assign({
    stdio: 'inherit'
  }, opts))
}
