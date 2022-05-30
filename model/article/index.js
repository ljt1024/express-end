// 建立文章表
const ArticleSchema = {
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
}

module.exports = { ArticleSchema }
