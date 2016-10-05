var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");
 
// multiple extract instances
// var extractCSS = new ExtractTextPlugin('generated[name].css');
var path = require("path");
var isProd = (process.env.NODE_ENV === 'production');
 
function getPlugins() {
    var plugins = [];
 
    // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': process.env.NODE_ENV
        }
    }));
 
    plugins.push(new ExtractTextPlugin('../css/[name].css', { allChunks: true }));
 
    // Conditionally add plugins for Production builds.
    if (isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: true
        }));
    }
    // Conditionally add plugins for Development
    else {
    }
 
    return plugins;
}
 
module.exports = {
    entry: {
        "main": "./media/ts/main.ts",
        "style": path.join(__dirname, 'media/scss/_results.scss')
    },
    output: {
        filename: "[name].js",
        path: "./media/generated/js",
        publicPath: "/media/generated/js"
    },
    resolve: {
        root: [ path.resolve("./media/scss") ],
        extensions: ["", ".ts", ".tsx", ".js", ".scss"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.handlebars$/, loader: "handlebars-loader" },
            { test: /\.scss$/i, loader: ExtractTextPlugin.extract("raw-loader", "raw-loader!sass-loader") },
        ]
    },
    plugins: getPlugins()
};