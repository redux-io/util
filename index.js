'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/redux-io-util.production.js')
} else {
  module.exports = require('./lib/redux-io-util.development.js')
}
