// 1、引入mongoose
const mongoose = require('mongoose');
const config = require('../config/config')
// 2、建立连接
mongoose.connect(config.dbUrl, { useNewUrlParser: true }, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('数据库连接成功');
});

module.exports = mongoose