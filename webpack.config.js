const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  mode: "production",
  entry: {
    content: path.join(__dirname, "src", "content.ts"),
    background: path.join(__dirname, "src", "background.ts"),
  },
  output: { path: path.join(__dirname, "dist"), filename: "[name].js" },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "." },
        { from: "node_modules/jquery/dist/jquery.min.js", to: "jquery.js" }, // Copy jQuery from node_modules to dist folder
        { from: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", to: "bootstrap.js" }, // Copy Bootstrap JS from node_modules to dist folder
        { from: "node_modules/@popperjs/core/dist/umd/popper.min.js", to: "popper.js" }, // Copy Popper.js from node_modules to dist folder
        { from: "node_modules/jquery-sendkeys/index.js", to: "jquery.sendkeys.js" },
      ],
    }),
  ],
};

module.exports = config;
