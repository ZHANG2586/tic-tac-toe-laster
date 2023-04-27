const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const webpack = require('webpack')
module.exports = {
    entry: path.resolve(__dirname, './src/inlet.tsx'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg?)$/,
                type: 'asset',
                parser: { dataUrlCondition: { maxSize: 10 * 1024 } },
                generator: { filename: 'img/[hash:10][ext][query]' },
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(scss|css|less)$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, {
                    loader: 'less-loader', options: {
                        lessOptions: {
                            exclude: /node_modules/,
                            // modifyVars: theme, // 自定义主题的
                            javascriptEnabled: true,
                        },
                    },
                }],
            },
            {

                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js', '...'] },
    optimization: { splitChunks: { chunks: 'all' } },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './templates/template.html'),
            filename: 'index.html',
            title: '井字棋游戏',
        }),
    ],
};
