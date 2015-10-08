'use strict'

const fs = require('fs')
const path = require('path')
const config = require('./config')
const restart = require('./restart')

exports.a = function (cfg) {
  let serverName = 'a.com'
  let serverRoot = './'

  if (cfg) {
    const arr = cfg.split(';')
    serverName = serverName[0]
    serverRoot = arr[1] || './'
  }

  const m = new Map()
  m.set(serverName, handlePath(serverRoot))
  setup(m)
}

exports.ab = function (cfg) {
  let m = new Map()
  if (cfg) {
    const arr = cfg.split('|')
    if (arr.length < 2) warn()
    arr.forEach(function (x) {
      const parts = arr.split(';')
      if (parts.length < 2) warn()
      m.set(parts[0], handlePath(parts[1]))
    })
  } else {
    m.set('a.com', handlePath('./a'))
    m.set('b.com', handlePath('./b'))
  }

  setup(m)
}

function handlePath (p) {
  return path.resolve(process.cwd(), p).replace(/\\/g, '/')
}

function warn () {
  console.log('Error: bad params')
  console.log('Example: xa ab --config="a.com;./a|b.com;./b"')
  process.exit()
}

function setup (servers) {
  const tpl = fs.readFileSync(path.join(config.configDir, 'httpd-temp.conf'), 'utf8')
  let content = ''
  servers.forEach(function (value, key) {
    content += tpl.replace('{{time}}', (new Date()).toISOString())
        .replace('{{name}}', key)
        .replace(/{{root}}/g, value) + '\n'
  })
  fs.writeFileSync(config.apache.temp, content)

  restart()
  print(servers)
}

function print (servers) {
  console.log(config.apache.temp)
  servers.forEach(function (value, key) {
    console.log(key, '->', value)
  })
}
