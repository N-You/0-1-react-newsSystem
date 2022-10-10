const { merge } = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common,{
  output:{
    path:undefined,
    filename:'static/js/[name].js',
  },
  mode:"development",
  devServer:{
    host:'localhost',
    port:8000,
    hot:true,
    historyApiFallback: true, // 解决前端路由刷新404问题
  },
  devtool: "cheap-module-source-map"
})