const express = require("express")
const tools = require('../../model/tools')
const NavModel = require('../../model/navModel')

const router = express.Router()

router.get("/", (req, res) => {
    res.send("导航列表")
})
router.get("/add", async (req, res) => {
    const result = new NavModel({
        title: "首页",
        url: "www.baidu.com"
    })
    await result.save()
    // res.render("admin/nav/add")
    res.send('增加导航成功')
})
router.get("/edit", (req, res) => {
    res.send("修改导航")
})
router.post("/doadd", tools.multer().single('uploadedfile'), (req, res) => {
    // 获取表单传过来的数据
    // const body = req.body
    // console.log(req.file);
    res.send({
        body: req.body,
        file: req.file
    })
    console.log(req.file, req.body)
})
router.post("/doedit", (req, res) => {
    res.send("执行修改")
})

module.exports = router