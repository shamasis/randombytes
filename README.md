randombytes
===

[![Version](http://img.shields.io/npm/v/randombytes.svg)](https://www.npmjs.org/package/randombytes) [![Build Status](https://travis-ci.org/crypto-browserify/randombytes.svg?branch=master)](https://travis-ci.org/crypto-browserify/randombytes)

randombytes from node that works in the browser.  In node you just get crypto.randomBytes, but in the browser it uses .crypto/msCrypto.getRandomValues

```js
var randomBytes = require('randombytes');
randomBytes(16);//get 16 random bytes
randomBytes(16, function (err, resp) {
  // resp is 16 random bytes
});
```

## Bring your own crypto

```js
var randomBytes = require('randombytes');

// set your own crypto supporting `randomBytes` function
randomBytes._compat({
  randomBytes: function (size, cb) {
    // your own implementation of randomBytes here
  }
});

randomBytes(16); //get 16 random bytes
```
