const files = require('./files')
const config = require('../config')

module.exports = function which(input) {
  const arr = files.filter(x => x.includes(input))
  const len = arr.length
  if (!len) {
    console.log('Not found in files.js:', input)
    process.exit()
  }

  if (len > 1) {
    console.log('which?')
    console.log(arr.join('\n'))
    console.log()
    process.exit()
  }

  switch (arr[0]) {
    case 'config.js':
      return config.configFile
    case 'vhost.conf':
      return config.vhostConf
    default:
      return config.getPath(arr[0])
  }
}
