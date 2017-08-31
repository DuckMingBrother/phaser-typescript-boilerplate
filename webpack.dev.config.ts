import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    entry: path.join(__dirname, 'src/app.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'game.js'
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
        new webpack.DefinePlugin({
            DEBUG: true,
        }),
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new HtmlWebpackPlugin({
            title: 'game',
            template: path.join(__dirname, 'templates/index.ejs')
        }),
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assests'
        }])
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
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: 'tslint-loader'
            },
            {
                test: /assets(\/|\\)/,
                use: 'file-loader?name=assets/[hash].[ext]'
            },
            {
                test: /pixi\.js$/,
                use: 'expose-loader?PIXI'
            },
            {
                test: /phaser-split\.js$/,
                use: 'expose-loader?Phaser'
            },
            {
                test: /p2\.js$/,
                use: 'expose-loader?p2'
            },
            {
                test: /\.ts$/,
                use: ['ts-loader', 'ts-nameof-loader'],
                exclude: '/node_modules/'
            }
        ]
    },
    devtool: 'eval'
};

export default config;
