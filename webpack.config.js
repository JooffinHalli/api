const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
require('dotenv').config({ path: './.env' });

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      App: path.resolve(__dirname, 'src/App'),
      models: path.resolve(__dirname, 'src/models'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/public/dist")
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new DefinePlugin({
      _APP_PATH_: JSON.stringify(process.env.APP_LOCAL_PATH),
      _APP_URL_: JSON.stringify(process.env.APP_LOCAL_URL),
      _API_URL_: JSON.stringify(process.env.API_LOCAL_URL)
    })
  ]
};