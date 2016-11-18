var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [ … ],
    output: { … },
    module: { … },
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({template: __dirname + "/app/index.tmpl.html"}),
        new webpack.HotModuleReplacementPlugin()
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css")
    ]
};
