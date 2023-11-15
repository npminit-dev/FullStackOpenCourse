const { red, blue, success } = require('console-log-colors')
require('dotenv').config()

const log = {
  info: (...params) => process.env.NODE_ENV==='development' ? console.log(blue(...params)) : null,
  success: (...params) => process.env.NODE_ENV==='development' ?  console.log(green(...params)) : null,
  error: (...params) => process.env.NODE_ENV==='development' ? console.log(red(...params)) : null
}

module.exports = log;
