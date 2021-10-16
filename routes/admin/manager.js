const express = require("express")
const router = express.Router()

// const ManagerModel = require('../../model/managerModel')

router.get("/", async (req, res) => {
    // 查询数据
    // const result = await ManagerModel.find({},)
    // console.log(result);
    // res.send("管理员管理")

    res.render("admin/manager/index.ejs")
})

router.get('/edit', async (req, res) => {
    res.render("admin/manager/edit.ejs")
})

router.get("/add", (req, res) => {
    // const result = new ManagerModel({
    //     username: '李四',
    //     password: '123456789'
    // })
    // result.save((err) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log('增加管理员成功');
    // })
    // 增加数据
    // res.send("增加管理员成功")
    res.render("admin/manager/add.ejs")
})

module.exports = router