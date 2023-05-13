const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    client: {
      overlay: false, // Hide errors from the browser
    },
    hot: true, // Enable hot reloading
    compress: true, // Enable gzip compression for everything served
    open: true, // Open the default browser on startup
  },
});
