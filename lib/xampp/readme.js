const fs = require('fs-extra')
const config = require('../config')

module.exports = function () {
  return fs.readFile(config.getPath('readme_en.txt'), 'utf8')
}
