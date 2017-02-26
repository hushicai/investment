var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isDebug = process.env.NODE_ENV !== 'production';

var commonLoaders = [
  { test: /\.js$/, loader: "babel-loader" },
  { test: /\.png$/, loader: "url-loader" },
  { test: /\.jpg$/, loader: "file-loader" },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            // CSS Loader https://github.com/webpack/css-loader
            sourceMap: true,
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            // CSS Nano http://cssnano.co/options/
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
      ]
    })
  }
];
var commonPlugins = [
  new ExtractTextPlugin('client.css')
];
var buildPath = path.join(__dirname, 'build');

module.exports = [
  {
    // The configuration for the client
    name: "browser",
    target: 'web',
    devtool: isDebug ? 'source-map': '',
    entry: "./src/client.js",
    output: {
      path: buildPath,
      filename: "client.js",
      publicPath: '/'
    },
    module: {
      rules: commonLoaders
    },
    plugins: commonPlugins
  },
  {
    // The configuration for the server-side rendering
    name: "server",
    entry: "./src/server.js",
    target: "node",
    devtool: isDebug ? 'source-map': '',
    output: {
      path: buildPath,
      filename: "server.js",
      publicPath: '/',
      libraryTarget: "commonjs2"
    },
    externals: /^[a-z\-0-9]+$/,
    node: {
      __dirname: true,
      __filename: true
    },
    module: {
      rules: commonLoaders
    },
    plugins: commonPlugins
  }
];

