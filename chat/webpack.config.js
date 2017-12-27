var path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    entry: "./js/main.js",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader', options: { importLoaders: 1 }
            }
        ]
    },
    output: {
        path: path.join(__dirname, "src"),
        filename: "main.min.js"
    }
};