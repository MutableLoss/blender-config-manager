/* eslint-disable max-len */

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var chalk = require('chalk');
var merge = require('webpack-merge');
var spawn = require('child_process').spawn;
var execSync = require('child_process').execSync;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var baseConfig = require('./webpack.config.base');
var CheckNodeEnv = require('./scripts/check_node_env');
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;
const publicPath = `http://localhost:${port}/`;

module.exports = merge.smart(baseConfig, {

  devtool: 'inline-source-map',

  target: 'electron-renderer',

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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/transform-runtime',
              "@babel/transform-classes",
              "@babel/proposal-class-properties",
              "@babel/transform-regenerator"
            ],
          }
        }
      },
      {
        test: /\.(?:sass|scss)$/,
        use: [
          'style-loader',
          'css-loader', {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          }
        }
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/, use: 'url-loader', },
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
      title: 'Barista'
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
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
      disableDotRule: false,
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
  },
});
``