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

app.post('/api/user/register',urlencodedParser, async (req, res) => {
    console.log(req.body.username);
    const isUserHas = await User.findOne({
        username: req.body.username
    })
    if (isUserHas) {
        return res.status(200).send({
            code: 201,
            msg: '用户名重复'
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        avatar: req.body.avatar || '',
        creatDate: new Date().toString()
    })
    res.send(user)
})

app.get('/api/userList',jsonParser, async (req, res) => {
    let query = {}
    if(req.query.username) {
        query.username = req.query.username
    }
    // if(req.query.id) {
    //     query.id = req.query.id
    // }
    var list = User.find(query)
    const page = req.query.page/1 || 1
    const rows =  req.query.rows/1 || 10
    list.skip((page - 1) * rows);
    list.limit(rows);
    list.exec(async (err, rs)=> {
        if(err) {
            res.send(err)
        } else {
            let all = await User.find(query)
            res.send({
                code: 200,
                total: all.length,
                data: rs
            })
        }
    })
})

app.post('/api/user/login',urlencodedParser, async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        username: req.body.username
    })

    if (!user) {
        return res.status(200).send({
            code: 201,
            msg: '用户名不存在'
        })
    }

    if(user.password !== req.body.password) {
        return res.status(200).send({
            code: 201,
            msg: '账号或密码错误'
        })
    }
    /*
      生成 token
      jwt.sign() 接受两个参数，一个是传入的对象，一个是自定义的密钥
    */
    const token = jwt.sign(
        { id: String(user._id) },
                SECRET,
        { expiresIn:  60 * 60 * 24 * 3 }// 以s作为单位（目前设置的过期时间为3天）
        )
    res.send({
        code: 200,
        data:{
            user,
            token
        }
    })
})

app.get('/api/user/profile', async (req, res) => {
    if (!req.headers.authorization) {
        res.send({
            code: 205,
            msg: 'token失效，请重新登录'
        })
        return
    }
    const raw = String(req.headers.authorization.split(' ').pop())
    // 解密 token 获取对应的 id
    try {
        var { id } = jwt.verify(raw, SECRET)
    } catch (e) {
        res.send({
            code: 205,
            msg: 'token失效，请重新登录'
        })
        return
    }
    req.user = await User.findById(id)
    res.send({
        code: 200,
        data: {
            user: {
                username: req.user.username,
                id: req.user._id,
                avatar: req.user.avatar|| ''
            }
        }
    })
})


module.exports = app
