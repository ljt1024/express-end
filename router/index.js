const express = require('express')
// 捕获全局异常,必须在路由处引进
require('express-async-errors');

const articleRouter = require('./article/index')
const UserRouter = require('./user/index')
const AdminRouter = require('./admin/index')
const columnRouter = require('./column/index')
const chartRouter = require('./chart/index')
const commentRouter = require('./comment/index')
const thumbRouter = require('./thumb/index')
const app = express()

app.use([articleRouter, UserRouter, columnRouter, AdminRouter, chartRouter, commentRouter, thumbRouter])

module.exports = app
