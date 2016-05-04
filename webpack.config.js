var path = require('path');
var webpack = require('webpack');
var StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
  devtool: 'eval',
  resolve: { root: __dirname },
  entry: [
    './index.html',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new StringReplacePlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin(['GOOGLE_API_KEY']),
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: [ 'react-hot', 'babel' ],
        include: path.join(__dirname, 'src'),
      },
      { test: /\.html$/,
        loaders: [
          'file?name=[path][name].[ext]',
          'extract',
          StringReplacePlugin.replace({
            replacements: [
              { pattern: /{{GOOGLE_API_KEY}}/,
                replacement: function replacer() {
                  return process.env.GOOGLE_API_KEY;
                },
              },
            ],
          }),
          'html',
        ],
      },
    ],
  },
};
