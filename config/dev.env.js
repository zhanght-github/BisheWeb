<<<<<<< HEAD
module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://172.20.55.231:8080/bishe"'
}
=======
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
>>>>>>> 0f3c8fb89d57b9a5a1fbfa94208ac46c99b4b106
