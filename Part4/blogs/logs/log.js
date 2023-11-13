const { red, blue, success } = require('console-log-colors')

const log = {
  info: (message) => console.log(blue(message)),
  success: (message) => console.log(blue(message)),
  error: (message) => console.log(red(message))
}

module.exports = log;
