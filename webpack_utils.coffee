path = require 'path'
nodeExternals = require 'webpack-node-externals'

module.exports =
  baseConfig:
    resolve:
      extensions: ['.js', '.json', '.coffee']
      modules: [
        'node_modules',
        path.resolve __dirname, 'src'
      ]
    externals: [nodeExternals()]
  coffeeRule:
    exclude: /(node_modules|bower_components)/
    test: /\.coffee$/
    use: [
      {loader: 'babel-loader'}
      {loader: 'coffee-loader'}
    ]
  jsRule:
    exclude: /(node_modules|bower_components)/
    test: /\.js$/
    use: [
      {loader: 'babel-loader'}
    ]
