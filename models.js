// 引入 mongoose
const mongoose = require('mongoose')
const md5 = require('md5-node')

// 连接数据库，自动新建 ExpressAuth 库
mongoose.connect('mongodb://localhost:27017/ExpressAuth', {
  useNewUrlParser: true,
  useCreateIndex: true
})

// 建立用户表
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set:(val)=> {
      let newVal =  md5(val)
      return newVal
    }
  }
})

// 建立文章表
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  abstract: {
    type: String
  },
  content: {
    type: String
  },
  creatTime: {
    type: String
  }
})

// 文章分类



// 建立用户数据库模型
const User = mongoose.model('User', UserSchema)
const Article = mongoose.model('Article', ArticleSchema)

module.exports = { User, Article }
