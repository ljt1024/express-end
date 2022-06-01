// 建立文章表
const ArticleSchema = {
    // 文章标题
    title: {
        type: String,
        unique: true
    },
    // 文章描述
    abstract: {
        type: String
    },
    // 文章内容
    content: {
        type: String
    },
    // 文章创建时间
    creatTime: {
        type: String
    },
    // 作者
    author: {
        type: String
    },
    // 评论数
    comments: {
        type: String
    },
    // 点赞数
    thumbs: {
        type: String
    },
    category: {
        type: String
    }
}

module.exports = { ArticleSchema }
