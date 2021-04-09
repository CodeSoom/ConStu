const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const Dotenv = require('dotenv-webpack');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const mode = process.env.NODE_ENV || DEVELOPMENT;

const appBuild = path.resolve(__dirname, 'build');
const appSrc = path.resolve(__dirname, 'src');
const appIndex = path.resolve(__dirname, 'src', 'index.jsx');
const appHtml = path.resolve(__dirname, 'public', 'index.html');

module.exports = {
  mode,
  devtool: 'cheap-eval-source-map',
  entry: appIndex,
  output: {
    path: appBuild,
    filename: mode === PRODUCTION
      ? 'static/js/[name].[contenthash:8].js'
      : mode === DEVELOPMENT && 'static/js/bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          mode === PRODUCTION
            ? MiniCssExtractPlugin.loader
            : 'style-loader', 'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jpe?g|PNG|gif)$/i,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/media',
          limit: 4000,
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/media',
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
        env: mode === DEVELOPMENT ? '(개발용)' : '',
      },
      minify: mode === PRODUCTION ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false,
    }),
    new CleanWebpackPlugin(),
    ...(mode === PRODUCTION
      ? [new MiniCssExtractPlugin({ filename: 'static/css/[name].[contenthash:8].css' })]
      : []),
    new Dotenv(),
  ],
  optimization: {
    minimizer: mode === PRODUCTION ? [
      new OptimizeCssAssetsPlugin(),
    ] : [],
  },
};
