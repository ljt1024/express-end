// 引入 express
const express = require('express')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const thumbRouter = new express.Router();
const { Comment, Article, Thumb } = require('../../model/index')

thumbRouter.post('/api/article/thumb', urlencodedParser, async (req, res) => {
    // 根据文章id查询点赞表， 文章点赞 判断用户是否存在，存在则删除，否则就添加
    const { userId, articleId } = req.body
    if(!articleId) {
        return res.send({
            code: 201,
            msg: 'articleId不能为空!'
        })
    }
    if(!userId) {
        return res.send({
            code: 201,
            msg: 'userId不能为空!'
        })
    }
    const thumbItem = await Thumb.findOne({
        articleId: articleId
    })
    // 从未点赞
    if (!thumbItem) {
      await Thumb.create({articleId, userIds:[userId]})
      return res.send({
          code: 200,
          msg: '已点赞!'
      })
    }
    const userIds = thumbItem.userIds
    let newUserIds = []
    let flag = false
    if (userIds.length > 0) {
        userIds.map(item => {
            if (item === userId) {
                flag = true
            } else {
                newUserIds.push(item)
            }
        })
    }
    if (!flag || userIds.length === 0) {
        newUserIds.push(userId)
    }
    console.log(newUserIds);
    const result = await Thumb.updateOne({
        articleId
    }, {
        userIds: newUserIds
    })

    await updateArticle(flag, articleId)

    if (flag) {
        res.send({
            code: 200,
            msg: '已取消点赞!'
        })
    } else {
        res.send({
            code: 200,
            msg: '已点赞!'
        })
    }

})

// 更新文章文章点赞数量
async function updateArticle(flag, articleId) {
    const articleItem = await Article.findOne({
        id: articleId
    })
    let thumbs = articleItem.thumbs
    flag ? --thumbs : ++thumbs
    console.log(thumbs);
    await Article.updateOne({
        id: articleId
    }, { thumbs })
}

module.exports = thumbRouter
