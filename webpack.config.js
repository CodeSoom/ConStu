const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEVELOPMENT_ENV = 'development';
const PRODUCTION_ENV = 'production';

const mode = process.env.NODE_ENV || DEVELOPMENT_ENV;

const appBuild = path.resolve(__dirname, 'build');
const appSrc = path.resolve(__dirname, 'src');
const appIndex = path.resolve(__dirname, 'src', 'index.jsx');
const appHtml = path.resolve(__dirname, 'public', 'index.html');

module.exports = {
  mode,
  entry: appIndex,
  output: {
    path: appBuild,
    filename: mode === PRODUCTION_ENV
      ? 'static/js/[name].[contenthash:8].js'
      : mode === DEVELOPMENT_ENV && 'static/js/bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|PNG|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/media',
          limit: 10000,
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        include: appSrc,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    overlay: true,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appHtml,
      templateParameters: {
        env: mode === DEVELOPMENT_ENV ? '(개발용)' : '',
      },
    }),
    new CleanWebpackPlugin(),
  ],
};
