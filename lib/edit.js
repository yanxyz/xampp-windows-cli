const parseArgs = require('./utils/parse-args')
const { edit } = require('./vhost')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), showHelp)
  const name = argv._[0]
  if (!name) {
    showHelp()
    return
  }
  run(name).catch(console.error)
}

function showHelp() {
  const cmd = `xa edit`
  console.log(`Usage: ${cmd} <domain>

${cmd} example.com
Edit example.com conf

${cmd} a
Edit a.com conf
`)
}

function run(name) {
  if (name.length === 1) name += '.com'
  return edit(name)
}
