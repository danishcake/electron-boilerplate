const webpack = require("webpack");
const { merge } = require('webpack-merge');
const path = require('path');

// Options passed to IFDEF loader.
// This allows for greater confidence that debug code can be completely removed
const ifdefOptions = {
  DEV_MODE: true
};

// Common webpack configuration
const common = require('./webpack.common')(ifdefOptions);

// Development mode webpack configuration
const devCommon = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

// Render specific config
const devRenderer = {
  devServer: {
    contentBase: [
      path.join(__dirname, '../dist'),
      path.join(__dirname, '../src/public')
    ],
    port: 3000,
    hot: true,
    writeToDisk: true,
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './render/index.tsx'
  ]
};

module.exports = [
  merge(common.main, devCommon),
  merge(common.renderer, devCommon, devRenderer)
];
