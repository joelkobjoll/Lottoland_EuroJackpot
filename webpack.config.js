var webpack = require('webpack');

var node_dir = __dirname + '/node_modules';

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
    entry: './media/ts/main.ts',
    output: {
        path: './media/js',
        filename: PROD ? 'js/main.min.js' : 'main.js'
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.handlebars$/, loader: "handlebars-loader" }
        ]
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ] : []
}; 