const path= require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
  mode:'development',
  entry: './src/app.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  resolve:{
    extensions:['.js','.json'],
  },
  module:{
    noParse:[/moment/],
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:[
          {
            loader:'babel-loader',
            options:{
              cacheDirectory:true
            }
          }
        ],
        //include: path.resolve('src'),
      },
      {
        test: /\.(css | less)$ /,
        use:[
          'style-loader',
          {
            loader:'css-loader',
            options:{
              importLoader:2
            }
          },
          'postcss-loader',
          {
            loader:'less-loader',
            options:{
              javascriptEnabled:true
            }
          }
        ],
        include: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
        //include: path.resolve(''),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template:'./public/index.html',
      filename:'index.html',
      favicon:'./public/favicon.ico',
      inject:true
    })
  ],
  node: {
    dns: "mock",
    fs: "empty",
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }

}