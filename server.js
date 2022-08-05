// 引入 express
const express = require('express')
const router = require('./router/index')
const path = require('path');
const cors = require('cors')
// 创建服务器应用程序
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(router)

// 开启服务，监听端口

app.listen(3002, () => {
  console.log('http://localhost:3002')
})

module.exports = app;
