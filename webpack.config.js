
const path = require('path')
const HTMLplugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    //Больше не надо добавлять ./src
    context: path.resolve(__dirname, 'src'),
    mode: 'development',//тип сборки
    //Указываем 2 точки входа в приложение e.1. Отдельные поля - чанки
    entry: {
        main: './index.js',
    },

    output: {//куда все файлы будут объединятся
        filename: "[contenthash].bundle.js",//e.2 паттерн который добавляет названия чанков из e.1  к bundle.js
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new HTMLplugin({
            template: "./template/index.html"
        }),
        // new NodePolyfillPlugin(),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
//o.1
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    //ds.1
    devServer: {
        port: 4200
    },
    // extensions:[], здесь можно указать расширения чтобы везде не писать .png .js .css
    module: {//подклюаем лоадеры
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {}
                }, 'css-loader']//в таком порядке подключаем лоадеры
            },
            {
                test: /\.(png|svg|gif|jpg)$/,
                use: ['file-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    }
}

