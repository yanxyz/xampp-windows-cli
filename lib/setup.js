const { resolve } = require('path')
const parseArgs = require('./utils/parse-args')
const setup = require('./vhost/setup')
const debug = require('debug')('xa:setup:cmd')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), {
    boolean: ['ssl', 'both', 'edit', 'open'],
    alias: {
      'edit': 'e',
      'open': 'o',
    }
  }, showHelp)

  const opts = Object.assign(handleInput(argv._), argv)
  debug(opts)
  setup(opts).catch(console.error)
}

function showHelp() {
  const cmd = 'xa setup'
  console.log(`Usage: ${cmd} <ServerName> [ServerRoot]

Options:

--ssl
  vhosts use https
--both
  vhosts use http and https
-e, --edit
  edit the vhost conf before restarting Apache
-o, --open
  open the vhost after setup

Examples:

${cmd} example.com .\\public
example.com -> .\\public

${cmd} a
a.com www.a.com -> .

${cmd} a b
a.com www.a.com -> .
b.com www.b.com -> .

${cmd} a .\\a b .\\b
a.com www.a.com -> .\\a
b.com www.b.com -> .\\b
`)
}

function handleInput(input) {
  const names = []
  let roots = []
  const re = /^([a-z0-9]+\.)+[a-z]+$/

  input.forEach(item => {
    if (item.length === 1) {
      // a-z
      const code = item.charCodeAt(0)
      if (code > 0x60 && code < 0x7B) {
        names.push(item + '.com')
      } else {
        roots.push(resolve(item))
      }
      return
    }

    if (item === 'localhost' || re.test(item)) {
      names.push(item)
      return
    }

    roots.push(resolve(item))
  })

  if (!names.length) {
    console.log('Missing ServerName')
    process.exit(1)
  }

  if (!roots.length) roots.push(process.cwd())
  while (roots.length < names.length) {
    roots = roots.concat(roots)
  }

  return {
    names,
    roots
  }
}
