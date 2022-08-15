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
let count = 0
app.ws("/socketTest", function(ws, req) {
  ws.on("message", async function (msg) {
    if (JSON.parse(msg).type === 0) {
      let isHasUser = connections.every(item=>{
        return item.username !== JSON.parse(msg).username
      })
      if (isHasUser) {
        console.log(JSON.parse(msg).username,'加入的用户')
        ws.username = JSON.parse(msg).username
        count++
        connections.push(ws)
        allSend(JSON.stringify({code:100 , msg: '服务器接收消息成功', count, username: ws.username}))
      }
    } else {
      try {
       let result =  await Chart.create({...JSON.parse(msg), createTime: new Date().toString()})
        allSend(JSON.stringify({code:200 , msg: '服务器接收消息成功' , result}))
      } catch (e) {
        console.log(e)
        allSend(JSON.stringify({code:200 , msg: '服务器接收消息成功,上传消息有问题' , e}))
      }

    }

  });
  ws.on('close', ()=> {
    console.log(ws.username,'离开的用户')
    if (ws.username) {
      connections = connections.filter(value=> {
        return value.username !== ws.username
      })
      count--
      allSend(JSON.stringify({code:100 , msg: '服务器接收消息成功', count, username: ws.username}))
    }
  })
});

// 群发
function allSend(msg) {
  console.log(connections);
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
