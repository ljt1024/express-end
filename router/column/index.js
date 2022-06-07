// 引入 express
const express = require('express')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const columnRouter = new express.Router();
const { Column } = require('../../model/index')

columnRouter.get('/api/columnList',jsonParser, async (req, res) => {
    let query = {}
    if(req.query.title) {
        query.title = req.query.title
    }
    var list = Column.find(query)
    res.send({
        code: 200,
        total: list.length,
        data: list
    })
})

columnRouter.post('/api/addColumn',urlencodedParser, async (req, res) => {
    var isNameHas = await Column.findOne({
        name: req.body.name
    })
    if (isNameHas) {
        return res.status(200).send({
            code: 201,
            msg: '名称重复'
        })
    }
     await Column.create({
        name: req.body.name
    })
    res.send({
        code: 200,
        msg: '添加成功'
    })
})

columnRouter.post('/api/deleteColumn',urlencodedParser, async (req, res) => {
    if(!req.body.id) {
        return res.send({
            code: 201,
            msg: 'id不能为空'
        })
    }
    const result = await Column.deleteOne({
        _id: req.body.id
    })
    res.send({
        code: 200,
        msg: '删除成功'
    })
})

columnRouter.post('/api/updateColumne',urlencodedParser, async (req, res) => {
    if(!req.body.id) {
        return res.send({
            code: 201,
            msg: 'id不能为空'
        })
    }
    const result = await Column.updateOne({
        _id: req.body.id
    },req.body)
    res.send({
        code: 200,
        msg: '更新成功'
    })
})

module.exports  = columnRouter
