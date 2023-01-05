// 引入 jwt
const jwt = require('jsonwebtoken')
// 解析 token 用的密钥
const SECRET = 'token_secret'

// 解析token
function validateToken(token) {
    try {
        var { id } = jwt.verify(token, SECRET)
    } catch (e) {
       return false
    }
    return  id
}
