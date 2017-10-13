/* eslint no-unused-vars: 0 */  // --> OFF
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  entry: './src/index.js',
  output: {
    filename: `bundle-${process.env.outname}.js`,
    path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery'
     }),
     new webpack.EnvironmentPlugin(['GRAPH']),
     new HtmlWebpackPlugin({  // Also generate a test.html
      filename: `${process.env.outname}.html`,
      title: `${process.env.outname} tree`,
      template: './graph.ejs',
     })
  ]
});
