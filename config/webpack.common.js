const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

function getStyleLoader(arg) {
  return [
    "style-loader",
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
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
      filename: "index.html",
    }),
  ],
  resolve: {
    alias:{
      '@':path.resolve(__dirname,"../src")
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
};
