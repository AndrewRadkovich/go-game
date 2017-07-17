const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/core.js',
    output: {
        path: "./build",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        })
    ]
}
