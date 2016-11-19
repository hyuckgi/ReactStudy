var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  entry : __dirname + "/app/app.js",
  devtool : 'dval-source-map',
  output : {
    path : __dirname + "/build",
    filename : "bundle.js"
  },
  module : {
    loaders : [
      {
        test:/\.json$/,
        loader : "json"
      },
      {
        test:/\.js$/,
        exclude :/(node_modules|bower_components)/,
        loader : "babel",
        query : {
          presets : ['es2015','react']
        }
      },
      {
        test:/\.css$/,
        loader : 'style!css?modules'
      }
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : __dirname + "/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer : {
  //  contentBase : "./public",
    colors : true, //터미널 색상
    historyApiFallback : true,
    inline : true, //페이지가 변경되여 새로 고침
    hot : true
//    port :8080
  }
};
