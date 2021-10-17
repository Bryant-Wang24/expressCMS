const express = require("express")
const router = express.Router()

const ManagerModel = require('../../model/managerModel')

router.get("/", async (req, res) => {
    // 获取管理员数据
    const result = await ManagerModel.find({},)
    console.log(result);

    res.render("admin/manager/index.ejs", {
        list: result
    })
})

router.get('/edit', async (req, res) => {
    res.render("admin/manager/edit.ejs")
})

router.get("/add", (req, res) => {
    // const result = new ManagerModel({
    //     username: '李四',
    //     password: '123456789',
    //     mobile: '17362452748',
    //     email: "485969746@qq.com"
    // })
    // result.save((err) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log('增加管理员成功');
    // })
    // // 增加数据
    // res.send("增加管理员成功")
    res.render("admin/manager/add.ejs")
})

module.exports = router