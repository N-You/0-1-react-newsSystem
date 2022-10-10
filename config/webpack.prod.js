const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const WebpackBar = require("webpackbar")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")

const os = require("os");
const threads = os.cpus().length;

exports.threads

module.exports = merge(common,{
  output:{
    path:path.join(__dirname,"../dist"),
    filename:'static/js/[name].[contenthash:10].js',
    assetModuleFilename:"static/media/[hash:10][ext]",
    clean:true
  },
  plugins:[
    new WebpackBar()
  ],
  optimization:{
    minimizer:[
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(
        {
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
          parallel:threads
        }
      ),
    ],
    splitChunks:{
      chunks:"all"
    },
    runtimeChunk:{
      name:(entrypoint) => `runtime~${entrypoint.name}.[contenthash:10].js`
    }
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  mode:"production",
  devtool:'source-map'
})