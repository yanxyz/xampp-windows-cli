const shortcuts = require('./shortcuts')

module.exports = function () {
  shortcuts.create().catch(console.error)
}
