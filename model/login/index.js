const md5 = require('md5-node')
// 建立用户表
const UserSchema = {
    id: {
        type: Number,
        default: new Date()
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        set: (val) => {
            let newVal = md5(val)
            return newVal
        }
    }
}



module.exports = { UserSchema }
