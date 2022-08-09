// 聊天表
const ChartSchema = {
    // 用户名称
    username: {
        type: String,
    },
    // 头像
    avatar: {
        type: String,
    },
    // 消息内容
    content: {
        type: String
    },
    // 消息类型
    type: {
        type: String
    },
    // 创建时间
    creatTime: {
        type: String
    },
    // 发送者id
    sendId: {
        type: String
    }
}

module.exports = { ChartSchema }
