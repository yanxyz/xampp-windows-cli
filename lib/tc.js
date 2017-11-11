const parseArgs = require('./utils/parse-args')
const files = require('./xampp/files')
const which = require('./xampp/which')
const openTc  = require('./utils/open-tc')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), showHelp)
  const name = argv._[0]
  if (!name) {
    showHelp()
    return
  }

  const file = which(name)
  openTc(file).catch(console.error)
}

function showHelp() {
  const cmd = 'xa tc'
  console.log(`Usage: ${cmd} <location>

Locations:

${files.join('\n')}

Examples:

${cmd} php    locate php.ini
`)
}
