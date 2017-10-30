var path = require('path')
var webpack = require('webpack')
require('dotenv').config();

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'GITHUB_CLIENT_ID',
      'GITHUB_CLIENT_SECRET'
    ])
  ]
}