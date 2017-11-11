const config = require('../config')
const { execFile } = require('.')

module.exports = function (file, opts) {
  const editor = config.editor

  if (editor.includes('subl')) {
    let args = [file]
    if (opts.root) {
      args.unshift('-n', '-a', opts.root)
    }
    return execFile(editor, args)
  }

  return execFile(editor, [file])
}
