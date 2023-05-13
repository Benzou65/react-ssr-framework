const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      defaultSizes: "gzip",
      generateStatsFile: true,
      statsFilename: "stats.json",
      reportFilename: "analyze/report.html",
    }),
  ],
  optimization: {
    minimize: true, // Minimize the bundle using Terser
  },
});
