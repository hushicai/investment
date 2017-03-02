var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isDebug = process.env.NODE_ENV !== 'production';
var buildPath = path.resolve(__dirname, './build');

var config = {
  devtool: isDebug ? 'source-map': '',
  output: {
    path: buildPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.js$/, loader: "babel-loader"},
      {test: /\.png$/, loader: "url-loader" },
      {test: /\.jpg$/, loader: "file-loader" },
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
    ]
  },
  plugins: [
    new ExtractTextPlugin('client.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': isDebug ? '"development"' : '"production"'
      }
    }),
    ...isDebug ? [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ] : []
  ]
};

var clientConfig = merge(config, {
  // The configuration for the client
  name: "browser",
  target: 'web',
  entry: [
    "webpack-hot-middleware/client",
    "./src/client.js"
  ],
  output: {
    filename: "client.js",
  }
});

var serverConfig = merge(config, {
  // The configuration for the server-side rendering
  name: "server",
  entry: "./src/server.js",
  target: "node",
  output: {
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  externals: /^[a-z\-0-9]+$/,
  node: {
    __dirname: true,
    __filename: true
  }
});

module.exports = [clientConfig, serverConfig];
