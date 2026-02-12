const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const dotenv = require("dotenv");

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

console.log(envKeys);

var commonConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            loader: "css-loader",
          },
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.(png|jpg|jpe?g|ico)$/,
        loader: "file-loader",
        options: {
          publicPath: "",
          name: "assets/images/[name].[ext]",
        },
      },
      {
        test: /\.(mp3|wav)$/,
        loader: "file-loader",
        options: {
          publicPath: "",
          name: "assets/sounds/[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          publicPath: "",
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};

var topperConfig = Object.assign({}, commonConfig, {
  target: "web",
  name: "topper",
  entry: "./src/index.js",
  output: {
    filename: "topper-bundle.js",
    path: path.resolve(__dirname, "./release/app"),
  },
  plugins: [
    new webpack.DefinePlugin({
      // <-- key to reducing React's size
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/index.html" }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CleanWebpackPlugin(),
    // new webpack.DefinePlugin(envKeys),
  ],
  // devServer: {
  //   contentBase: './release/app'
  // }
  devServer: {
    open: true,
    static: {
      directory: path.resolve(__dirname, "./release/app"),
    },
    port: 9000,
  },
});

module.exports = () => {
  return [topperConfig];
};
