const fs = require('fs')
const { join } = require('path')

const configDir = join(__dirname, '../../config')
const configFile = get('config.js')
const vhostConf = get('vhost.conf')

const config = require(configFile)
const sitesEnabled = join(config.xamppInstallDir, 'apache/conf/sites-enabled')

module.exports = {
  configDir,
  configFile,
  vhostConf,
  sitesEnabled,
  ...config,
  getPath(name) {
    return join(config.xamppInstallDir, name)
  },
  getConfPath(name) {
    if (name.length === 1) name += '.com'
    return join(sitesEnabled, name + '.conf')
  },
}

function get(name) {
  const file = join(configDir, 'user', name)
  if (fs.existsSync(file)) return file
  return join(configDir, name)
}
