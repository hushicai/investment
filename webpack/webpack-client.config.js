var config = require('./webpack.config');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var isDebug = process.env.NODE_ENV !== 'production';

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: isDebug,
      modules: true,
      minimize: false
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        require('autoprefixer')({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ]
        })
      ]
    }
  },
  'sass-loader'
];

var clientConfig = merge(config, {
  name: "browser",
  target: 'web',
  entry: isDebug ? [
    "webpack-hot-middleware/client",
    "./src/client.js"
  ] : ['./src/client.js'],
  output: {
    filename: "client.js",
  },
  module: {
    rules: [
      isDebug ? {
        test: /\.scss$/,
        use: [
          'style-loader',
          ...cssLoaders
        ]
      } : {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('client.css'),
    ...isDebug ? [] : [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  ]
});

module.exports = clientConfig;;
