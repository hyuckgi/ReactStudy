var webpack = require('webpack');

// import webpack from 'webpack';

module.exports = {
    entry: './App.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
    	port: 8080
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    }

    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
}
