const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
require('dotenv').config({ path: './.env' });

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    hot: false,
    contentBase: path.join(__dirname, 'public'),
    port: +process.env.APP_LOCAL_PORT,
  },
  output: {
    path: path.resolve(__dirname)
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      App: path.resolve(__dirname, 'src/App'),
      models: path.resolve(__dirname, 'src/models'),
      utils: path.resolve(__dirname, 'src/utils')
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      _APP_PATH_: JSON.stringify(process.env.APP_LOCAL_PATH),
      _APP_URL_: JSON.stringify(process.env.APP_LOCAL_URL),
      _API_URL_: JSON.stringify(process.env.API_LOCAL_URL)
    })
  ]
};