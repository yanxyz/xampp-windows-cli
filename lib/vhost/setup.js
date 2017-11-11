const fs = require('fs-extra')
const render = require('./render')
const apache = require('../apache')
const config = require('../config')
const { edit, open } = require('.')
const hosts = require('../hosts')

module.exports = async function (opts) {
  const { names, roots } = opts
  const vhosts = []
  for (let i = 0, len = names.length; i < len; i++) {
    const name = names[i]
    vhosts.push({
      name,
      root: roots[i],
      alias: name,
      conf: config.getConfPath(name),
      ssl: opts.ssl,
      both: opts.both
    })
  }

  await Promise.all(vhosts.map(create))

  if (opts.edit) {
    return edit(vhosts[0].name)
  }

  await include()
  await hosts.contains(names)

  apache.start()

  if (opts.open) {
    open(vhosts[0])
  }
}

async function create(vhost) {
  vhost.time = new Date().toISOString()
  console.log(`${vhost.name} -> ${vhost.root}`)
  return fs.outputFile(vhost.conf, await render(vhost))
}

async function include() {
  const conf = config.getPath('apache/conf/httpd.conf')
  const content = await fs.readFile(conf, 'utf8')
  const str = `Include conf/sites-enabled/*.conf`
  if (content.includes(str)) return
  return fs.writeFile(conf, content + '\n' + str)
}
