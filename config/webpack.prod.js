const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common,{
  output:{
    path:path.join(__dirname,"../dist"),
    filename:'static/js/[name].[contenthash:10].js',
    clean:true
  },
  mode:"production"
})