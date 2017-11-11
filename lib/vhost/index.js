const config = require('../config')
const edit = require('../utils/open-editor')
const { spawn } = require('child_process')

exports.edit = function (name) {
  const conf = config.getConfPath(name)
  console.log('Notice: restart Apache(run `xa start`) after changing the conf')
  return edit(conf, { root: config.sitesEnabled })
}

exports.open = function (vhost) {
  const url = 'http' + (vhost.ssl ? 's' : '') + '://' + vhost.name
  spawn('cmd.exe', ['/c', 'start', url])
}
