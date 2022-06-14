const express = require('express')
const articleRouter = require('./article/index')
const UserRouter = require('./user/index')
const AdminRouter = require('./admin/index')
const columnRouter = require('./column/index')
const app = express()

app.use([articleRouter, UserRouter, columnRouter, AdminRouter])

module.exports = app
