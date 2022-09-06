// 引入 express
const express = require('express')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const articleRouter = new express.Router();
const { Article } = require('../../model/index')

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
    var list = Article.find(query)
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

module.exports  = articleRouter
