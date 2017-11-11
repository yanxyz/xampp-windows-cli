const fs = require('fs-extra')
const path = require('path')
const { runVbs } = require('../utils')
const confirmer = require('confirmer')

const hosts = path.join(process.env.SystemRoot, 'System32\\drivers\\etc\\hosts')
const script = path.join(__dirname, 'open.vbs')

exports.open = function () {
  return runVbs(script)
}

exports.contains = async function (names) {
  if (typeof names === 'string') names = [names]
  const content = await fs.readFile(hosts, 'utf8')
  content.split(/\r?\n/).forEach(line => {
    if (line.startsWith('#')) return
    const arr = line.split(/\s+/)
    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      if (name === 'localhost') {
        names.splice(i--, 1)
        continue
      }
      for (let j = 1; j < arr.length; j++) {
        if (name === arr[j]) {
          names.splice(i--, 1)
        }
      }
    }
  })

  if (!names.length) return

  console.log('These domains should be added to hosts:', names.join(' '))
  const result = await confirmer('Add them now? (y/n)')
  if (result) {
    return runVbs(script)
  }

  console.log('Run `xa hosts` when you decide to add your domains to hosts.')
  process.exit()
}
