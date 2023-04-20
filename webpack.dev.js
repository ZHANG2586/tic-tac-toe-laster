const path = require('path');
const { merge } = require('webpack-merge');
const ComConfig = require('./webpack.common');
const prodConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        static: path.join(__dirname, './dist'),
        open: true,
        hot: true,
        port: 3010,
    }
      
}
module.exports = merge(prodConfig, ComConfig)