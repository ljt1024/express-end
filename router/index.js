const express = require('express')
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
