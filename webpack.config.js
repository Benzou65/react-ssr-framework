const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    app: { import: "./src/Entry.tsx" }, // , dependOn: "vendor" },
    // vendor: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    clean: true, // Clean the /dist folder before each build
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      defaultSizes: "gzip",
      generateStatsFile: true,
      statsFilename: "stats.json",
      reportFilename: "analyze/report.html",
    }),
  ],
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
  optimization: {
    minimize: true, // Minimize the bundle using Terser
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
