/* eslint-disable max-len */

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var spawn = require('child_process').spawn;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var baseConfig = require('./webpack.config.base');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;
const publicPath = `http://localhost:${port}/`;

module.exports = merge.smart(baseConfig, {
  devtool: 'source-map',
  target: 'electron-main',
  entry: [
    'index.js',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/app/index.js')
  ],
  output: {
    publicPath: `http://localhost:${port}/`
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/transform-runtime',
              '@babel/proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // @TODO: Waiting on https://github.com/jantimon/html-webpack-plugin/issues/533
      // multiStep: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      template: 'app/app.html',
      appMountIds: ['app', 'portal'],
      devServer: 'http://localhost:3000',
      title: 'Blender Config Manager'
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'build'),
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      if (process.env.START_HOT) {
        console.log('Staring Main Process...');
        spawn(
          'npm',
          ['run', 'start-hot'],
          { shell: true, env: process.env, stdio: 'inherit' }
        )
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
      }
    }
  }
})
