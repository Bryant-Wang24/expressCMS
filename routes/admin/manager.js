const express = require("express")
const router = express.Router()

const ManagerModel = require('../../model/managerModel')

router.get("/", (req, res) => {
    // 查询数据
    ManagerModel.find({}, (err, data) => {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    })
    res.send("管理员管理")
})
router.get("/add", (req, res) => {
    const result = new ManagerModel({
        username: '李四',
        password: '123456789'
    })
    result.save((err) => {
        if (err) {
            return console.log(err);
        }
        console.log('增加管理员成功');
    })
    // 增加数据
    res.send("增加管理员成功")
})

module.exports = router