var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'app': './index.css'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].css'
  },
  module: {
    loaders: [
      {
        test(filePath) {
          return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
        },
        loader: ExtractTextPlugin.extract(
          'css?sourceMap&-restructuring!' +
          'postcss'
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true,
    }),
  ],
  postcss: [
    require('./clearfix')
  ]
}
