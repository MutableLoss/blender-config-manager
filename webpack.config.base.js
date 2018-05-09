var path = require('path');
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var externals = require('./package.json').dependencies;

module.exports = {
  externals: [
    'devtron'
  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  },

  output: {
    path: path.join(__dirname, 'build'),
    pathinfo: true,
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  node: {
    __dirname: true,
    __filename: false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.NamedModulesPlugin(),
  ],
};
