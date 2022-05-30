const express = require('express')
const articleRouter = require('./article/index')
const LoginRouter = require('./login/index')
const app = express()

app.use([articleRouter, LoginRouter])

module.exports = app
