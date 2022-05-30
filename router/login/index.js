const express = require('express')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const app = express.Router();
const { User } = require('../../model/index')
// 引入 jwt
const jwt = require('jsonwebtoken')
// 解析 token 用的密钥
const SECRET = 'token_secret'

app.post('/api/register',urlencodedParser, async (req, res) => {
    const isUserHas = await User.findOne({
        username: req.body.username
    })
    if (isUserHas) {
        return res.status(422).send({
            msg: '用户名重复'
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send(user)
})


app.post('/api/login',urlencodedParser, async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        username: req.body.username
    })

    if (!user) {
        return res.status(200).send({
            msg: '用户名不存在'
        })
    }

    if(user.password !== req.body.password) {
        return res.status(200).send({
            msg: '密码无效'
        })
    }
    /*
      生成 token
      jwt.sign() 接受两个参数，一个是传入的对象，一个是自定义的密钥
    */
    const token = jwt.sign({ id: String(user._id) }, SECRET)
    res.send({
        code: 200,
        data:{
            user,
            token
        }
    })
})

app.get('/api/profile', async (req, res) => {
    const raw = String(req.headers.authorization.split(' ').pop())
    // 解密 token 获取对应的 id
    const { id } = jwt.verify(raw, SECRET)
    req.user = await User.findById(id)
    res.send({
        code: 200,
        data: {
            user: req.user
        }
    })
})


module.exports = app
