path = require 'path'
webpack = require 'webpack'
{baseConfig, coffeeRule, jsRule} = require './webpack_utils'

module.exports =
  entry: [
    'mocha-loader!' + path.resolve __dirname, 'src/spec.coffee'
    'webpack-hot-middleware/client'
  ]
  module:
    rules: [
      coffeeRule
      jsRule
    ]
  resolve: baseConfig.resolve
  stats: 'errors-only'
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    new webpack.NoEmitOnErrorsPlugin()
  ]
  output:
    path: path.resolve __dirname, 'src_gen'
    filename: 'spec.js'
