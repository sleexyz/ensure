webpack = require 'webpack'
config = require '../webpack.config.test-node'

webpack config, (err, stats) ->
  console.error err if err?
