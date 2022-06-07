const express = require('express')
const articleRouter = require('./article/index')
const LoginRouter = require('./login/index')
const columnRouter = require('./column/index')
const app = express()

app.use([articleRouter, LoginRouter, columnRouter])

module.exports = app
