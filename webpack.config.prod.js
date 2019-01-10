/* eslint-disable max-len */

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
var baseConfig = require('./webpack.config.base');
// var CheckNodeEnv = require('./scripts/CheckNodeEnv');

const PATHS = {
  app: path.join(__dirname, './app/index.js'),
  build: path.join(__dirname, '/build/'),
}

module.exports = merge.smart(baseConfig, {
    target: 'electron-renderer',
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
