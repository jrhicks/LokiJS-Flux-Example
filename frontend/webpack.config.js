'use strict';

var webpack = require('webpack');

module.exports = {
  context: __dirname,

  entry: './assets/js/app.js',

  output: {
    filename: 'rails.bundle.js',
    path: __dirname + '/../app/assets/javascripts'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional&optional=runtime'
      }
    ]
  },

  externals: {
    google: 'google'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
