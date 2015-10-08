'use strict'

const config = require('./config')

exports = module.exports = function (version) {
  if (version) {
    print(config.get(version))
    return
  }

  console.log('xampp:')
  config.versions.forEach(function (key) {
    let str = ' -> ' + config._[key].installDir
    if (key === config.version) {
      str = key + '(current)' + str
    } else {
      str = key + str
    }
    console.log(str)
  })
}

exports.print = print

function print (config) {
  console.log('installation directory:', config.installDir)
  console.log('shortcut:              ', config.shortcut)
  console.log('httpd-vhosts.conf:     ', config.apache.vhosts)
  console.log('php.ini:               ', config.php.ini)
  console.log('my.ini:                ', config.mysql.ini)
}
