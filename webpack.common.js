const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpack = require('webpack')
module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output:{
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
              test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
              type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(scss|css)$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
               },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '8*1024',
                            name: '[name].[ext]',
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                
                test: /\.(js|jsx|ts|tsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            }       
        ]
    },        
    resolve: {
          extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
    optimization: {
        splitChunks: {
            chunks: 'all' 
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './templates/template.html'),
            filename: 'index.html',
            title: '井字棋游戏'
        })
    ]
}