'use strict'

const fs = require('fs-extra')
const path = require('path')
const config = require('./config')
const restart = require('./restart')

module.exports = function (target) {
  switch (target) {
    case 'vhosts':
      vhosts()
      break
    case 'php':
      php()
      break
    case 'mysql':
      mysql()
      break
    default:
      panel()
      vhosts()
      php()
      mysql()
  }

  restart()
}

function panel () {
  copy(path.join(config.configDir, 'xampp-control.ini'), config.panel.ini)
}

function vhosts () {
  const file = path.join(config.configDir, 'httpd-vhosts.conf')
  const content = fs.readFileSync(file, 'utf8')
    .replace(/{{root}}/g, config.apache.htdocs)
  fs.writeFileSync(config.apache.vhosts, content)
  // httpd-temp.conf should exist otherwise Apache can't start
  fs.ensureFileSync(config.apache.temp)
}

function php () {
  copy(path.join(config.configDir, 'php.ini'), config.php.ini)
}

function mysql () {
  copy(path.join(config.configDir, 'my.ini'), config.mysql.ini)
  const dir = config['mysql_datadir']
  if (dir && (dir !== config.mysql.defaultDataDir)) {
    // ignore if file exists
    try {
      fs.copySync(config.mysql.defaultDataDir, dir, {
        clobber: false
      })
    } catch (err) {
      // pass
    }
  }
}

function copy (src, dest) {
  try {
    fs.copySync(src, dest)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No such file', src)
    } else {
      throw err
    }
  }
}
