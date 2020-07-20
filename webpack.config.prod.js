/* eslint-disable max-len */

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var baseConfig = require('./webpack.config.base');
var TerserPlugin = require('terser-webpack-plugin');
// var CheckNodeEnv = require('./scripts/CheckNodeEnv');

const PATHS = {
  app: path.join(__dirname, './app/index.js'),
  build: path.join(__dirname, '/build/')
}

module.exports = merge.smart(baseConfig, {
    target: 'electron-main',
    entry: PATHS.app,
    output: {
      path: PATHS.build,
      publicPath: PATHS.build,
      filename: 'bundle.js'
    },
    module: {
    rules: [
      {
        test: /\.global\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: './',
          use: {
            loader: 'style-loader',
            options: {
              minimize: true,
              publicPath: './'
            }
          }
        })
      },
      {
        test: /.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              engine: 'rework'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules']
  },
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {},
        extractComments: true,
        ie8: false,
        keep_fnames: false,
        mangle: true,
        nameCache: null,
        output: null,
        parse: {},
        toplevel: false,
        warnings: false
      }
    })]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'style.css'
    })
  ]
});
