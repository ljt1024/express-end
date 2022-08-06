// 建立文章表
const ArticleSchema = {
    id: {
        type: String
    },
    // 文章标题
    title: {
        type: String,
        sparse: true,
        required: true
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
    // 阅读数
    readNum: {
        type: String
    },
    // 分类标签
    category: {
        type: String
    },
    // 文章图片
    img: {
        type: String
    },
    // 是否发布
    ispublish: {
        type: Boolean
    },
    // 是否推荐
    isrecommend: {
        type: Boolean
    },
}

module.exports = { ArticleSchema }
