// 建立栏目表
const ColumnSchema = {
    // 栏目名称
    columnName: {
        type: String,
        unique: true
    },
    // 栏目描述
    columnAbstract: {
        type: String
    },
}

module.exports = { ColumnSchema }
