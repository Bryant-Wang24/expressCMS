const express = require("express")
const router = express.Router()
const { md5, getUnix } = require("../../model/tools")
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
router.post('/doadd', async (req, res) => {
    // 1、获取表单提交的数据
    const username = req.body.username
    const password = req.body.password
    const rpassword = req.body.rpassword
    const email = req.body.email
    const mobile = req.body.mobile
    // 验证数据是否合法
    if (username === '') {
        res.render("admin/public/error.ejs", {
            "redirectUrl": "/admin/manager/add",
            "message": "用户名不能为空"
        })
        return
    }
    if (password.length < 6) {
        res.render("admin/public/error.ejs", {
            "redirectUrl": "/admin/manager/add",
            "message": "密码长度不能小于6位"
        })
        return
    }
    if (password !== rpassword) {
        res.render("admin/public/error.ejs", {
            "redirectUrl": "/admin/manager/add",
            "message": "两次输入的密码不一致"
        })
        return
    }
    // 3、判断数据库里面有没有我们要增加的数据
    let result = await ManagerModel.find({ "username": username, })
    if (result.length > 0) {
        res.render("admin/public/error.ejs", {
            "redirectUrl": "/admin/manager/add",
            "message": "当前用户已存在，请换一个用户名"
        })
        return
    } else {
        // 4、执行增加操作
        const addResult = new ManagerModel({
            username,
            password: md5(password),
            email,
            mobile,
            addtime: getUnix()
        })
        await addResult.save()
        res.redirect("/admin/manager")
    }
})

module.exports = router