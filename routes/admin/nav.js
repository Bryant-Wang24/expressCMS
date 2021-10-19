const express = require("express")
const tools = require('../../model/tools')
const NavModel = require('../../model/navModel')
const { getUnix } = require("../../model/tools")

const router = express.Router()

router.get("/", async (req, res) => {
    const result = await NavModel.find({})
    res.render("admin/nav/index.ejs", {
        list: result
    })
})
router.get("/add", async (req, res) => {
    res.render("admin/nav/add.ejs")
})
router.post("/doadd", async (req, res) => {
    // res.render("admin/nav/add.ejs")
    // const title = req.body.title
    // const link = req.body.link
    // const position = req.body.position
    // const is_opennew = req.body.is_opennew
    // const sort = req.body.sort
    // const status = req.body.status
    const result = new NavModel(Object.assign(req.body, { add_time: getUnix() }))
    await result.save()

    res.render('admin/public/success.ejs', {
        message: "增加数据成功",
        redirectUrl: '/admin/nav'
    })

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