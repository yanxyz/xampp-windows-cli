#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
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
  fs.createReadStream(path.join(__dirname, '/usage.txt')).pipe(process.stdout)
}

function run (argv) {
  // minimist convert numeric arguments to numbers: 7.0 -> 7
  const target = process.argv[3]

  switch (argv._[0]) {
    case 'a':
      require('./vhost').a(argv)
      break
    case 'ab':
      require('./vhost').ab()
      break
    case 'ls':
      require('./ls')(target)
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
    case 'start':
      require('./restart')()
      break
    case 'stop':
      require('./restart')(true)
      break
    default:
      console.log('Error: no such command')
  }
}
