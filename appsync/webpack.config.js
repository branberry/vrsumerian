const webpack = require('webpack');

const webpackConfig = {
  context: __dirname,
  entry: { appsync: './index.js' },
  output: {
    path: `${__dirname}/dist`,
    filename: 'appsync.js'
  },
  module: {
    rules: [
      { test: /\.js?$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  }
};

module.exports = webpackConfig;