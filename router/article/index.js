// 引入 express
const express = require('express')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const articleRouter = new express.Router();
const { Article, Thumb, User } = require('../../model/index')
// 引入 jwt
const jwt = require('jsonwebtoken')
// 解析 token 用的密钥
const SECRET = 'token_secret'


// 获取文章列表
articleRouter.get('/api/articleList',jsonParser, async (req, res) => {
    let query = {}
    if(req.query.title) {
        query.title = req.query.title
    }
    if(req.query.id) {
        query.id = req.query.id
    }
    if(req.query.category) {
        query.category= req.query.category
    }
    const backData = 'abstract author category comments id img isLike readNum thumbs _id title'
    var list = Article.find(query).select(backData)
    const page = req.query.page/1 || 1
    const rows =  req.query.rows/1 || 10
    list.skip((page - 1) * rows);
    list.limit(rows);
    list.exec(async (err, rs)=> {
        if(err) {
            res.send(err)
        } else {
            let all = await Article.find(query)
            res.send({
                code: 200,
                total: all.length,
                data: rs
            })
        }
    })
})

// 获取文章详情
articleRouter.get('/api/detailArticle', jsonParser, async (req, res) => {
    if(!req.query.id) {
        return res.send({
            code: 201,
            msg: 'id不能为空!'
        })
    }
    let userId = ''
    // 未登录
    if (req.headers.authorization) {
        const raw = String(req.headers.authorization.split(' ').pop())
        // 解密 token 获取对应的 id
        if (raw) {
            try {
                var { id } = jwt.verify(raw, SECRET)
            } catch (e) {
                res.send({
                    code: 205,
                    msg: 'token失效，请重新登录'
                })
                return
            }
        }
        userId = await User.findById(id)
    } else {
        userId = ''
    }
    // 解析token
    const result = await Article.findOne({
        id: req.query.id
    })
    // 查询是否是本人点赞
    const thumbItem = await Thumb.findOne({
        articleId: req.query.id
    })
    let isFlower = false

    if ( thumbItem
         && Array.isArray(thumbItem.userIds)
         && thumbItem.userIds.length > 0
         && userId._id
         && thumbItem.userIds.includes(userId._id))
    {
        isFlower = true
    } else {
        isFlower = false
    }
    let newDate = JSON.parse(JSON.stringify(result))
    res.send({
        code: 200,
        data: {...newDate, isFlower },
        msg: '请求成功!'
    })
})

// 添加文章
articleRouter.post('/api/addArticle',urlencodedParser, async (req, res) => {
    var isTitHas = await Article.findOne({
        title: req.body.title
    })
    if(!req.body.title || req.body.title === '') {
        return res.status(200).send({
            code: 201,
            msg: '标题不能为空'
        })
    }
    if (isTitHas) {
        return res.status(200).send({
            code: 201,
            msg: '标题重复'
        })
    }
    try {
        const articles = await Article.create({id:new Date().getTime(),createTime: new Date().getTime(),...req.body})
    } catch (e) {
        console.log(e);
        return res.send({
            code: 500,
            msg: e
        })
    }
    res.send({
        code: 200,
        msg: '添加成功'
    })
})

// 删除文章
articleRouter.post('/api/deleteArticle',urlencodedParser, async (req, res) => {
    if(!req.body.id) {
        return res.send({
            code: 201,
            msg: 'id不能为空'
        })
    }
    const result = await Article.deleteOne({
        _id: req.body.id
    })
    res.send({
        code: 200,
        msg: '删除成功'
    })
})

// 更新文章
articleRouter.post('/api/updateArticle',urlencodedParser, async (req, res) => {
    if(!req.body.id) {
        return res.send({
            code: 201,
            msg: 'id不能为空'
        })
    }
    const isIdHas = await Article.findOne({
        id: req.body.id
    })
    if(!isIdHas) {
        return res.send({
            code: 201,
            msg: 'id不存在'
        })
    }
    try{
        const result = await Article.updateOne({
            id: req.body.id
        },req.body)
        res.send({
            code: 200,
            msg: '更新成功'
        })
    }catch (e) {
        res.send({
            code: 500,
            msg: e
        })
    }

})

// 点赞取消点赞 废弃
articleRouter.post('/api/article/updateLike',urlencodedParser, async (req, res) => {
    const value = await Article.findOne({ id: req.body.id})
    value.isLike = !value.isLike
    if (value.isLike) {
        value.thumbs++
    } else if (value.thumbs > 0){
        value.thumbs--
    }
    const result = await Article.updateOne({
        id: req.body.id
    },{isLike: value.isLike, thumbs: value.thumbs})
    res.send({
        code: 200,
        msg: '更新成功'
    })
})

module.exports  = articleRouter
