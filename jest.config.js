'use strict'

const ENV = process.env.TARGET_ENV || 'development'
const TYPE = process.env.TARGET_TYPE || 'source'

const rfx = {
  build: {
    development: '<rootDir>/lib/redux-io-util.development.js',
    production: '<rootDir>/lib/redux-io-util.production.js',
  },
  source: {
    development: '<rootDir>/src',
    production: '<rootDir>/src',
  },
}[TYPE][ENV]

module.exports = {
  moduleNameMapper: {
    '^@redux-io/util$': rfx,
  }
}
