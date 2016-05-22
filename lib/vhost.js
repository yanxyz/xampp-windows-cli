'use strict'

const fs = require('fs-extra')
const path = require('path')
const config = require('./config')
const restart = require('./restart')

const TEMP_VHOSTS = path.join(config.configDir, 'httpd-temp.conf')

exports.a = function (options) {
  check()

  // default
  let servers = [{
    serverName: 'a.com',
    serverAlias: 'www.a.com',
    serverRoot: handlePath('.')
  }]

  let vhost = options.vhost
  if (vhost) {
    if (!Array.isArray(vhost)) vhost = [vhost]
    servers = vhost.map(handleVhost)
  }

  setup(servers)
}

/**
 * set up a.com(./a) and b.com(./b)
 */

exports.ab = function () {
  check()

  let servers = [{
    serverName: 'a.com',
    serverAlias: 'www.a.com',
    serverRoot: handlePath('./a')
  }, {
    serverName: 'b.com',
    serverAlias: 'www.b.com',
    serverRoot: handlePath('./b')
  }]

  setup(servers)
}

/**
 * Make sure httpd-vhosts.conf contains: Include conf/extra/httpd-temp.conf
 */

function check () {
  const includes = readFile(config.apache.vhosts).includes('conf/extra/httpd-temp.conf')
  if (includes) return

  console.error('apache/conf/extra/httpd-vhosts.conf does not include httpd-temp.conf')
  console.error('run command `xa set vhosts` to update it')
  process.exit(1)
}


/**
 * Handle command line argument vhost
 */

function handleVhost (vhost) {
  let arr = vhost.split(';').map((x) => x.trim())
  let serverName = arr[0]
  let serverRoot = handlePath(arr[1])
  let serverAlias = ''

  const space = ' '
  if (serverName.includes(space)) {
    arr = serverName.split(space)
    serverName = arr.shift()
    serverAlias = arr.join(space)
  }

  return {
    serverName,
    serverAlias,
    serverRoot
  }
}

/**
 * Convert relative path to absolute path
 */

function handlePath (p) {
  return path.resolve(process.cwd(), p || '.').replace(/\\/g, '/')
}

/**
 * set up vhosts
 */

function setup (servers) {
  const tpl = readFile(TEMP_VHOSTS)
  let content = ''
  servers.forEach((server) => {
    const alias = server.serverAlias
    content += tpl.replace('{{time}}', (new Date()).toISOString())
        .replace(/{{name}}/g, server.serverName)
        .replace(/{{ServerAlias}}/g, alias ? `ServerAlias ${alias}` : '# ServerAlias')
        .replace(/{{root}}/g, server.serverRoot) + '\n'
  })
  fs.writeFileSync(config.apache.temp, content)

  restart()
  print(servers)
}

function print (servers) {
  console.log(config.apache.temp)
  servers.forEach((server) => {
    console.log(server.serverName, server.serverAlias, '->', server.serverRoot)
  })
}

function readFile (filePath) {
  return fs.readFileSync(filePath, 'utf8')
}
