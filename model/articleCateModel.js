const mongoose = require('./core')
const Schema = mongoose.Schema
const ArticleCateSchema = mongoose.Schema({
    title: { type: String },
    link: { type: String },
    pid: { type: Schema.Types.Mixed },//混合类型
    sub_title: { type: String },
    keywords: { type: String },
    description: { type: String },
    status: { type: Number, default: 1 },
    sort: {
        type: Number, default: 100
    },
    add_time: {
        type: Number
    }
})
module.exports = mongoose.model("ArticleCate", ArticleCateSchema, "article_cate")