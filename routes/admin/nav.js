const express = require("express")
const tools = require('../../model/tools')

const router = express.Router()

router.get("/", (req, res) => {
    res.send("导航列表")
})
router.get("/add", (req, res) => {
    res.render("admin/nav/add")
    // res.send("增加导航")
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