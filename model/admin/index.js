const md5 = require('md5-node')
// 建立管理员表
const AdminSchema = {
    // id: {
    //     type: Number,
    //     default: new Date()
    // },
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



module.exports = { AdminSchema }
