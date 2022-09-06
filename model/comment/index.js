// 建立评论表
const CommentSchema = {
    // 评论内容
    commentContent: {
        type: String,
    },
    // 文章id
    articleId: {
        type: String
    },
    // 用户信息
    userInfo: {
        type: Object
    },
    // 回复列表
    replayList: {
        type: Array
    },
    // 评论时间
    createTime: {
        type: String
    },
    // 点赞数
    thumbs: {
        type: Number,
        default: 0
    },
    // 是否点赞
    isLike: {
        type: Boolean,
        default: false
    }
}

module.exports = { CommentSchema }
