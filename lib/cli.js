#!/usr/bin/env node

'use strict'

const fs = require('fs')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2), {
  alias: { h: 'help' }
})

if (argv.help || !argv._.length) {
  help()
} else {
  run(argv)
}

function help () {
  fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout)
}

function run (argv) {
  const target = argv._[1]

  switch (argv._[0]) {
    case 'a':
      require('./vhost').a(argv.config)
      break
    case 'ab':
      require('./vhost').ab(argv.config)
      break
    case 'ls':
      require('./ls')(target)
      break
    case 'prepare':
      require('./prepare')()
      break
    case 'set':
      require('./set')(target)
      break
    case 'shortcut':
      require('./shortcut')()
      break
    case 'use':
      if (!target) {
        console.log('not enough parameters')
        console.log('Usage: xa use <version>')
      } else {
        require('./use')(target)
      }
      break
    default:
      console.log('Error: no such command')
  }
}
