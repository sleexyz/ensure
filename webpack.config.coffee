path = require 'path'
{baseConfig, coffeeRule, jsRule} = require './webpack_utils'

module.exports =
  entry: path.resolve __dirname, 'src/index.coffee'
  externals: baseConfig.externals
  module:
    rules: [
      coffeeRule
      jsRule
    ]
  resolve: baseConfig.resolve
  stats: 'errors-only'
  target: 'web'
  output:
    path: path.resolve __dirname, 'src_gen'
    filename: 'index.js'
