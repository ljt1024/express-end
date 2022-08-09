// 引入 express
const express = require('express')
const router = require('./router/index')
const path = require('path');
const cors = require('cors')
const expressWs = require('express-ws')

// 创建服务器应用程序
const app = express()
expressWs(app)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(router)
app.ws("/socketTest", function (ws, req) {
  ws.send("你连接成功了");
  ws.on("message", function (msg) {
    console.log(msg)

    ws.send("这是第二次发送信息");
  });
});

app.use((err, req, res, next)=> {
  console.error('Error:', err);
  res.status(500).send('Service Error');
});
// 开启服务，监听端口

app.listen(3002, () => {
  console.log('http://localhost:3002')
})

module.exports = app;
