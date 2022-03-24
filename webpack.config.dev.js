const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", //we are going to transpile our code with babel, source maps let us see original code when debug in browser
  entry: "./src/index", //default, could leave it out
  output: {
    //in dev mode webpack doesn't output code, it serves app from memory
    path: path.resolve(__dirname, "build"), //__dirname is current dir name, but it's not going to write to "build"
    publicPath: "/", //public ulr of output dir when referenced in browser
    filename: "bundle.js", //in dev it won't be created, but setting still needed
  },
  devServer: {
    historyApiFallback: true, //all requests sent to index.htlm, so that deep links will be handled by react-router
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      //what files we want to handle
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"], //run bable on js files & webpack will bundle it up
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"], //allows importing css just like js & webpack will bundle it in one css file
      },
    ],
  },
};
