const config = require('./config')
const readme = require('./xampp/readme')

module.exports = function () {
  console.log()
  console.log('XAMPP is installed at', config.xamppInstallDir)
  console.log()
  run()
}

async function run() {
  const text = await readme()
  const lines = text.split('\n')
  console.log(lines[0])
  console.log()

  let started = false
  for (var i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('  +')) {
      started = true
      console.log(line)
    } else if (started) {
      break
    }
  }
  console.log()
}
