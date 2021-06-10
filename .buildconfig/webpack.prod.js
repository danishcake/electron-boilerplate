const { merge } = require('webpack-merge');

const ifdefOptions = {
  DEV_MODE: false
};

const common = require('./webpack.common')(ifdefOptions);
const prod = {
  mode: 'production'
};

module.exports = [merge(common.main, prod), merge(common.renderer, prod)];
