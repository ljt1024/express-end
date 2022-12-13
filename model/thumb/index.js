// 建立点赞表
const ThumbSchema = {
    // 评论id
    commentId: {
        type: String,
    },
    // 文章id
    articleId: {
        type: String
    },
    // 用户id list
    userIds: {
        type: Array
    }
}

module.exports = { ThumbSchema }
