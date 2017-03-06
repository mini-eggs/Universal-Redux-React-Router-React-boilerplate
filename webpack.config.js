var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var extractSass = new ExtractTextPlugin({
  filename: path.join('../styles') + '/bundle.css',
  disable: false
});

module.exports = {
  entry: path.join(__dirname, 'src', 'client') + '/entry.js',
  output: {
    path: path.join(__dirname, 'dist', 'client', 'scripts'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: extractSass.extract({
          loader: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallbackLoader: 'style-loader'
        })
      }
    ]
  },
  plugins: [extractSass]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      verbose_more: true
    })
  ]);
}
