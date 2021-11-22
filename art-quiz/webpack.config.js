const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, options) => {
  const isDevelopment = options.mode === "development";
  const isProduction = options.mode === "production";

  const config = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "none" : "source-map",
    entry: [
      path.join(__dirname, "./src/index.js"),
      path.join(__dirname, "./src/css/style.scss"),
    ],
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "script.js",
    },
    //
    // externals: {
    //   paths: PATHS,
    // },
    // entry: {
    //   app: ["babel-polyfill", PATHS.src],
    // },
    //
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          include: path.join(__dirname, "assets/img"),
          include: path.join(__dirname, "assets/svg"),
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./src/assets/audio",
            to: "./src/assets/audio",
          },
          {
            from: "./src/assets/full",
            to: "./src/assets/full",
          },
          {
            from: "./src/assets/img",
            to: "./src/assets/img",
          },
          {
            from: "./src/assets/svg",
            to: "./src/assets/svg",
          },
          {
            from: "./src/assets/png",
            to: "./src/assets/png",
          },
          //   {
          //     from: "./src/data",
          //     to: "./src/data",
          //   },

          // {
          //     from: './src/pages',
          //     to: './pages'
          // },
        ],
      }),
    ],
  };
  return config;
};
