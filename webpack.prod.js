const { merge } = require('webpack-merge');
const ComConfig = require('./webpack.common');
const prodConfig = { mode: 'production' };
module.exports = merge(prodConfig, ComConfig);
