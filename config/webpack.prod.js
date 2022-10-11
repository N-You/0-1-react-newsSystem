const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const WebpackBar = require('webpackbar')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')

const os = require('os')
const threads = os.cpus().length

module.exports = merge(common, {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:10].js',
    chunkFilename: 'static/js/[name].chunk.[contenthash:10].js',
    clean: true,
  },
  plugins: [
    new WebpackBar(),
    new MiniExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            dot: true, // 允许匹配以 . 开头的文件, 比如 .gitignore
            gitignore: false,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
        parallel: threads,
      }),
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  mode: 'production',
  devtool: 'source-map',
})
