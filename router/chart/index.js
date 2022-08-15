// 引入 express
const express = require('express')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const chartRouter = new express.Router();
const { Chart } = require('../../model/index')

chartRouter.get('/api/chartList',jsonParser, async (req, res) => {
    let query = {}
    var list = await Chart.find({})
    res.send({
        code: 200,
        total: list.length,
        data: list
    })
})

chartRouter.post('/api/chartSend',urlencodedParser, async (req, res) => {
    await Chart.create({...req.body, createTime: new Date().toString()})
    res.send({
        code: 200,
        msg: '发送成功'
    })
})

chartRouter.post('/api/deleteAllChart',urlencodedParser, async (req, res) => {
    await Chart.remove({})
    res.send({
        code: 200,
        msg: '删除成功'
    })
})

module.exports  = chartRouter
