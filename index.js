var FUNCTION = 'function',
    crypto

try {
  crypto = require('crypto')
} catch (e) { }

module.exports = function (size, cb) {
  if (crypto && typeof crypto.randomBytes === FUNCTION) {
    return crypto.randomBytes(size, cb)
  }

  throw new Error('secure random number generation not supported')
}

module.exports._compat = function (_crypto) {
  _crypto && (crypto = _crypto)
}
