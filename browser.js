'use strict'
var crypto = global.crypto || global.msCrypto

function randomBytes (size, cb) {
  // phantomjs needs to throw
  if (size > 65536) throw new Error('requested too many random bytes')
  // in case browserify  isn't using the Uint8Array version
  var rawBytes = new global.Uint8Array(size)

  // This will not work in older browsers.
  // See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
  if (size > 0) {  // getRandomValues fails on IE if size == 0
    crypto.getRandomValues(rawBytes)
  }
  // phantomjs doesn't like a buffer being passed here
  var bytes = new Buffer(rawBytes.buffer)

  if (typeof cb === 'function') {
    return process.nextTick(function () {
      cb(null, bytes)
    })
  }

  return bytes
}

module.exports = function (size, cb) {
  if (crypto && crypto.getRandomValues) {
    return randomBytes(size, cb)
  } else if (crypto && crypto.randomBytes) {
    return crypto.randomBytes(size, cb)
  }

  throw new Error('secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11')
}

module.exports._compat = function (_crypto) {
  _crypto && (crypto = _crypto)
}
