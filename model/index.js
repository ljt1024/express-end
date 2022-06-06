// 引入 mongoose
const mongoose = require('mongoose')
const UserOption = require('./login')
const ArticleOption = require('./article')

// 连接数据库，自动新建 ExpressAuth 库
mongoose.connect('mongodb://localhost:27017/ExpressAuth', {
    useNewUrlParser: true,
    useCreateIndex: true
},error => {
    console.log(error)
})


// 建立用户表
const UserSchema = new mongoose.Schema(UserOption.UserSchema)
// 建立文章表
const ArticleSchema = new mongoose.Schema(ArticleOption.ArticleSchema)

// 建立数据库模型
const User = mongoose.model('User', UserSchema)
const Article = mongoose.model('Article', ArticleSchema)

module.exports = { User, Article }
