// 引入 express
const express = require('express')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const commentRouter = new express.Router();
const { Comment, Article, Thumb } = require('../../model/index')
const validateToken = require('../../utils/index')

commentRouter.get('/api/commentList',jsonParser, async (req, res) => {
    let query = {}
    if(req.query.id) {
        query.articleId = req.query.id
    }
    // 1:用户未登录, 2: 用户登录了，判断每个评论是否是自己点赞, 循环查询点赞表
    const list = await Comment.find(query).sort({createTime: -1})
    if (req.query.userId) {
        if (Array.isArray(list) && list.length > 1) {
            for (let i = 0; i < list.length; i++) {
               if (await isMyThumb(list[i]._id, req.query.userId)) {
                   list[i].isLike = true
               } else {
                   list[i].isLike = false
               }
            }
        }
    }
    res.send({
        code: 200,
        total: list.length,
        data: list
    })
})

async function isMyThumb(commentId, userId) {
 // 根据评论id查询点赞表用户ids, 判断用户id是否存在ids中，存在表示已经点赞，否则未点赞
    let thumbItem = await Thumb.find({commentId})
    let userIds = thumbItem.userIds
    return Array.isArray(userIds) && userIds.includes(userId)
}

commentRouter.post('/api/sendComment',urlencodedParser, async (req, res) => {
    await Comment.create({...req.body, createTime: new Date().getTime()})
    const list = await Comment.find({articleId: req.body.articleId})
    await Article.updateOne({id: req.body.articleId},{comments:list.length})
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

// 点赞取消点赞 废弃
commentRouter.post('/api/updateLike',urlencodedParser, async (req, res) => {
    const value = await Comment.findOne({ _id: req.body.id})
    value.isLike = !value.isLike
    if (value.isLike) {
        value.thumbs++
    } else if (value.thumbs > 0){
        value.thumbs--
    }
    const result = await Comment.updateOne({
        _id: req.body.id
    },{isLike: value.isLike, thumbs: value.thumbs})
    res.send({
        code: 200,
        msg: '更新成功'
    })
})

module.exports  = commentRouter
