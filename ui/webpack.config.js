const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        board: ['./src/board.js'],
        core: ['./src/core.js'],
        entities: ['./src/entities.js'],
        eventbus: ['./src/eventbus.js'],
        game: ['./src/game.js'],
        painter: ['./src/painter.js'],
        rules: ['./src/rules.js'],
        utils: ['./src/utils.js']
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    devtool: 'source-map',
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
