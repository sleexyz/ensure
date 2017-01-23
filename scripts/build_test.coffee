webpack = require 'webpack'
config = require '../webpack.test.config'

webpack config, (err, stats) ->
  console.error err if err?
