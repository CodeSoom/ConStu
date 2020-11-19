const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT_ENV = 'development';
const mode = process.env.NODE_ENV || DEVELOPMENT_ENV;

module.exports = {
  mode,
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: mode === DEVELOPMENT_ENV ? '(개발용)' : '',
      },
    }),
  ],
};
