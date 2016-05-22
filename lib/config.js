'use strict'

const fs = require('fs')
const path = require('path')
const os = require('os')

const configDir = path.join(os.homedir(), 'xampp')
const configFile = path.join(configDir, 'config.js')
const activeConfigFile = path.join(configDir, 'active.json')

exports = module.exports = get()
exports.get = get

function get (version, update) {
  let config
  try {
    config = require(configFile)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log('Error: Cannot find the config file', configFile)
      process.exit(2)
    } else {
      throw err
    }
  }

  const versions = Object.keys(config)

  if (!version) {
    try {
      let currentConfig = require(activeConfigFile)
      version = currentConfig.version
      if (!config[version]) {
        version = versions[0]
        update = true
      }
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        version = versions[0]
        update = true
      } else {
        throw err
      }
    }
  }

  // only validate current
  if (!config[version]) {
    console.log(`Error: not found '${version}' in the config file`)
    process.exit(13)
  }

  if (typeof config[version] !== 'object') {
    console.log(`Error: config['${version}'] is not an object`)
    process.exit(13)
  }

  // used for path.join and string comparison
  version = String(version)

  const installDir = path.normalize(config[version].installDir)
  const panelExe = path.join(installDir, 'xampp-control.exe')
  if (!fileExists(panelExe)) {
    console.log(`Error: ${panelExe} does not exist`)
    process.exit(2)
  }

  if (update) {
    fs.writeFileSync(activeConfigFile, JSON.stringify({version}, null, 2))
  }

  let shortcut = config[version].shortcut
  shortcut = shortcut ? path.normalize(shortcut) : ''

  function handlePath (name) {
    const p = config[version][name]
    config[version][name] = path.resolve(configDir, p || name)
  }

  handlePath('httpd-vhosts.conf')
  handlePath('httpd-temp.conf')

  return Object.assign({}, config[version], {
    version,
    versions,
    configDir: path.join(configDir, version),
    installDir,
    shortcut,
    panel: {
      exe: panelExe,
      ini: path.join(installDir, 'xampp-control.ini')
    },
    apache: {
      htdocs: path.join(installDir, 'htdocs'),
      vhosts: path.join(installDir, 'apache/conf/extra/httpd-vhosts.conf'),
      temp: path.join(installDir, 'apache/conf/extra/httpd-temp.conf')
    },
    php: {
      ini: path.join(installDir, 'php/php.ini')
    },
    mysql: {
      ini: path.join(installDir, 'mysql/bin/my.ini'),
      defaultDataDir: path.join(installDir, 'mysql/data')
    },
    _: config
  })
}

function fileExists (file) {
  try {
    const stats = fs.statSync(file)
    return stats.isFile()
  } catch (err) {
    return false
  }
}
