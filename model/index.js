// 引入 mongoose
const mongoose = require('mongoose')
const UserOption = require('./user')
const AdminOption = require('./admin')
const ArticleOption = require('./article')
const ColumnOption = require('./column')
const ChartOption = require('./chart')

// 连接数据库，自动新建 ExpressAuth 库
mongoose.connect('mongodb://localhost:27017/ExpressAuth', {
    useNewUrlParser: true,
    useCreateIndex: true
},error => {
    console.log(error)
})


// 建立用户表
const UserSchema = new mongoose.Schema(UserOption.UserSchema)
// 建立管理员表
const AdminSchema = new mongoose.Schema(AdminOption.AdminSchema)
// 建立文章表
const ArticleSchema = new mongoose.Schema(ArticleOption.ArticleSchema)
// 建立栏目表
const ColumnSchema = new mongoose.Schema(ColumnOption.ColumnSchema)
// 建立消息表
const ChartSchema = new mongoose.Schema(ChartOption.ChartSchema)

// 建立数据库模型
const User = mongoose.model('User', UserSchema)
const Admin = mongoose.model('Admin', AdminSchema )
const Article = mongoose.model('Article', ArticleSchema)
const Column = mongoose.model('Column', ColumnSchema)
const Chart =  mongoose.model('Chart', ChartSchema)

module.exports = { User, Article, Column, Admin, Chart }
