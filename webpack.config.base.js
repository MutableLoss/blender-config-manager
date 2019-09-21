var path = require('path');
var webpack = require('webpack');
var TerserPlugin = require('terser-webpack-plugin');
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
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
        }
      }
    },
    {
      test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
      loader: 'file-loader'
    },
    { 
      test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
      use: 'url-loader', 
    }]
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
