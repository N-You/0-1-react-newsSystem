const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  output: {
    path: undefined,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
    clean: true,
  },
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8000,
    hot: true,
    historyApiFallback: true, // 解决前端路由刷新404问题
    proxy: {
      '/api': {
        target: 'https://i.maoyan.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  devtool: 'cheap-module-source-map',
})
