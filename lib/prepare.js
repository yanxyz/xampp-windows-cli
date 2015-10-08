'use strict'

const fs = require('fs-extra')
const path = require('path')
const config = require('./config')

const bakDir = path.join(config.configDir, 'bak')

module.exports = function () {
  if (!fileExists(config.panel.ini)) {
    const file = path.join(config.configDir, 'xampp-control.ini')
    if (!fileExists(file)) {
      const content = `
[Common]
Language=en

[Autostart]
Apache=1
MySQL=1
FileZilla=0
Mercury=0
Tomcat=0
      `
      fs.writeFile(file, content)
    }
  } else {
    copy(config.panel.ini, 'xampp-control.ini')
  }

  copy(config.apache.vhosts, 'httpd-vhosts.conf')
  copy(config.php.ini, 'php.ini')
  copy(config.mysql.ini, 'my.ini')
}

function copy (src, name) {
  // backup
  const dest = path.join(bakDir, name)
  if (fileExists(dest)) {
    console.log('file already exists', dest)
  } else {
    fs.copySync(src, dest)
  }

  if (name === 'httpd-vhosts.conf') {
    // ignore if file exists
    // not use sync method for it will throw EEXIST error
    fs.copy(path.join(__dirname, '../config-sample/httpd-vhosts.conf'),
      path.join(config.configDir, name), {
        clobber: false
      })

    fs.copy(path.join(__dirname, '../config-sample/httpd-temp.conf'),
      path.join(config.configDir, 'httpd-temp.conf'), {
        clobber: false
      })
  } else {
    fs.copy(src, path.join(config.configDir, name), {
      clobber: false
    })
  }
}

function fileExists (file) {
  try {
    const stats = fs.statSync(file)
    return stats.isFile()
  } catch (err) {
    return false
  }
}
