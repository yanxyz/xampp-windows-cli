const minimist = require('minimist')

module.exports = function (argv, opts, showHelp) {
  if (typeof opts === 'function') {
    showHelp = opts
    opts = null
  } else if (typeof showHelp !== 'function') {
    showHelp = () => {}
  }

  const args = minimist(argv, merge(opts))

  if (args.help) {
    showHelp()
    process.exit()
  }

  return args
}

function merge(opts) {
  if (!opts) return null

  if (Array.isArray(opts.boolean)) {
    opts.boolean.push('help')
  } else if (typeof opts.boolean === 'string') {
    opts.boolean = [opts.boolean, 'help']
  }

  opts.alias = Object.assign({ 'help': 'h' }, opts.alias)
  return opts
}
