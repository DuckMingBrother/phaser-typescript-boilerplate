var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/app.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'game.min.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
            phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
            p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
            assets: path.join(__dirname, 'assets/')
        }
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildStart: ['npm run assets']
        }),
        new webpack.DefinePlugin({
            'DEBUG': false
        }),
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            screw_ie8: true
        }),
        new HtmlWebpackPlugin({
            title: 'game',
            template: path.join(__dirname, 'templates/index.ejs')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        inline: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/
        }
    },
    module: {
        rules: [{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },

            {
                test: /assets(\/|\\)/,
                loader: 'file-loader?name=assets/[hash].[ext]'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: '/node_modules/'
            }
        ]
    }
};