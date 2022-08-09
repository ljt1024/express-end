// 引入 express
const express = require('express')
const router = require('./router/index')
const path = require('path');
const cors = require('cors')
const expressWs = require('express-ws')
const { Chart } = require('./model/index')
// 创建服务器应用程序
const app = express()
expressWs(app)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(router)

// ws 集合
let connections = []
app.ws("/socketTest", function(ws, req) {
  ws.on("message", async function (msg) {
    //  这里用户刚进来的时候push
    connections.push(ws)
    await Chart.create({...JSON.parse(msg), createTime: new Date().toString()})
    allSend(JSON.stringify({code:200 , msg: '服务器接收消息成功'}))
    // ws.send(), (err)=> {
    //   console.log(err)
    // })

  });

});

// 群发
function allSend(msg) {
  console.log(connections,'集合');
  connections.map(item => {
    item.send(msg)
  })
}
app.use((err, req, res, next)=> {
  console.error('Error:', err);
  res.status(500).send('Service Error');
});
// 开启服务，监听端口

app.listen(3002, () => {
  console.log('http://localhost:3002')
})

module.exports = app;
