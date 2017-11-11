const config = require('../config')
const { execFile } = require('.')

module.exports = function (file) {
  return execFile(config.totalcmd, ['/O', '/T', '/S', '/L=' + file])
}
