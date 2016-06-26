var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, 'example', 'src', 'index.jsx'),
  output: {
    path: './example',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader:ExtractTextPlugin.extract("style-loader",[
          "css", "sass"
        ])
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./example/src")]
  },
  devServer: {
    contentBase: path.join(__dirname, 'example')
  },
  plugins: [
    new ExtractTextPlugin("react-notice.css")
  ]
}
