const path = require('path')
const config = require('../config')
const { runVbs } = require('../utils')
const readme = require('../xampp/readme')

exports.create = async function () {
  const text = await readme()
  const version = text.match(/[0-9.]+/)[0]
  await runVbs(path.join(__dirname, 'create.vbs'), [
    config.getPath('xampp-control.exe'),
    path.join(process.env['USERPROFILE'], 'Desktop', `xampp-${version}.lnk`)
  ])
}
