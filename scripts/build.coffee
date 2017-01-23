webpack = require 'webpack'
config = require '../webpack.config'

webpack config, (err, stats) ->
  console.error err if err?
