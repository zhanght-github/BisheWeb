<<<<<<< HEAD
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"sit"',
  BASE_API: '"http://172.20.55.231:8080/bishe"'
}
=======
'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
>>>>>>> 0f3c8fb89d57b9a5a1fbfa94208ac46c99b4b106
