// 引入 express
const express = require('express')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const commentRouter = new express.Router();
const { Comment } = require('../../model/index')

commentRouter.get('/api/commentList',jsonParser, async (req, res) => {
    let query = {}
    if(req.query.id) {
        query.articleId= req.query.id
    }
    var list = await Comment.find(query).sort({createTime: -1})
    res.send({
        code: 200,
        total: list.length,
        data: list
    })
})

commentRouter.post('/api/sendComment',urlencodedParser, async (req, res) => {
    console.log(req);
    await Comment.create({...req.body, createTime: new Date().getTime()})
    res.send({
        code: 200,
        msg: '评论成功'
    })
})

commentRouter.post('/api/deleteColumn',urlencodedParser, async (req, res) => {
    if(!req.body.id) {
        return res.send({
            code: 201,
            msg: 'id不能为空'
        })
    }
    const result = await Comment.deleteOne({
        _id: req.body.id
    })
    res.send({
        code: 200,
        msg: '删除成功'
    })
})

commentRouter.post('/api/updateColumne',urlencodedParser, async (req, res) => {
    if(!req.body.id) {
        return res.send({
            code: 201,
            msg: 'id不能为空'
        })
    }
    const result = await Comment.updateOne({
        _id: req.body.id
    },req.body)
    res.send({
        code: 200,
        msg: '更新成功'
    })
})

module.exports  = commentRouter
