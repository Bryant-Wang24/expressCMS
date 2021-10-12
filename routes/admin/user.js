const express = require("express")
const tools = require("../../model/tools")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("用户列表")
})
router.get("/add", (req, res) => {
    res.render("admin/user/add")
})


router.get("/edit", (req, res) => {
    res.send("修改用户")
})

const cpUpload = tools.multer().fields([{ name: 'uploadedfile1', maxCount: 1 }, { name: 'uploadedfile2', maxCount: 8 }])
router.post("/doadd", cpUpload, (req, res) => {
    res.send({
        body: req.body,
        files: req.files
    })
})
router.post("/doedit", (req, res) => {
    res.send("执行修改")
})

module.exports = router