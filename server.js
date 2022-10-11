//运行打包后的文件
const express = require('express')
const app = express()
const port = 3000
app.use(express.static('dist'))
app.listen(port, () => console.log(`服务器 ${port} 开启成功!`))
