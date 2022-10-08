const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry:{
    index:path.join(__dirname,"../src/index.js")
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx|ts|tsx)$/,
        loader:"babel-loader"
      },
      {
        test:/\.css/,
        use:["style-loader","css-loader"]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.join(__dirname,"../public/index.html"),
      filename:'index.html'
    })
  ],
  resolve:{
    extensions: [".js",".jsx",".json",".ts",".tsx"]
  }
}