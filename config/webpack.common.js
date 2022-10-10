const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniExtractPlugin = require("mini-css-extract-plugin")
const ESLintWebpackPlugin = require("eslint-webpack-plugin")

const { threads } = require("./webpack.prod")

function getStyleLoader(arg) {
  return [
    MiniExtractPlugin.loader,
    "css-loader",
    {
      loader:"postcss-loader",
      options:{
        postcssOptions:{
          plugins:["postcss-preset-env"]
        }
      }
    },
    arg && {
      loader: arg,
    },
  ].filter(Boolean);
}

module.exports = {
  entry: {
    index: path.join(__dirname, "../src/index.js"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader("sass-loader"),
      },
      {
        test:/\.(gif|png|jpe?g|webp|svg)$/,
        type:"asset",
        parser:{
          dataUrlCondition:{
            maxSize: 4 * 1024
          }
        },
        generator:{
          filename:'static/images/[hash:10][ext]'
        }
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: 'asset/resource',
      generator: {
        // 输出图片名称
        //[hash:10]取文件前10位
        filename: 'static/media/[hash:10][ext][query]'
      }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
      filename: "index.html",
    }),
    new MiniExtractPlugin(),
    new ESLintWebpackPlugin({
      context:path.resolve(__dirname,"../src"),
      cache:true,
      cacheLocation:path.resolve(__dirname,"../node_modules/.cache/eslintcache"),
      threads
    }),
  ],
  resolve: {
    alias:{
      '@':path.resolve(__dirname,"../src")
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
};
