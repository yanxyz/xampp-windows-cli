#!/usr/bin/env node

const commands = require('./commands')
const arg = process.argv[2]
if (!arg || arg.startsWith('-')) {
  showHelp()
}
main(arg)

function main(arg) {
  const arr = commands.filter(c => c.name.startsWith(arg))
  const len = arr.length

  if (!len) {
    console.log('Unknown argment.')
    console.log()
    showHelp()
  }

  if (len > 1) {
    console.log('which?')
    console.log(arr.map(c => c.name).join('\n'))
    return
  }

  const mod = arr[0].mod || './' + arr[0].name
  require(mod)()
}

function showHelp() {
  const n = Math.max(...commands.map(c => c.name.length)) + 5
  const cmd = 'xa'
  console.log(`Usage: ${cmd} <command> [options]

Commands:

${commands.map(pad).join('\n')}

${cmd} <command> -h
View <command> help
`)

  function pad(cmd) {
    return cmd.name.padEnd(n) + cmd.desc
  }

  process.exit()
}
