const express = require('express')
const { getUnix } = require("../../model/tools")
const ArticleCateModel = require("../../model/articleCateModel")
const mongoose = require('../../model/core')

const router = express.Router()
router.get("/", async (req, res) => {
    const result = []
    res.render("admin/articleCate/index.ejs", {
        list: result
    })
})
router.get("/add", async (req, res) => {
    // 获取顶级分类
    const topCateList = await ArticleCateModel.find({ "pid": "0" })
    res.render("admin/articleCate/add.ejs", {
        cateList: topCateList
    })
})
router.post("/doadd", async (req, res) => {
    if(req.body.pid!=="0"){
        req.body.pid = mongoose.Types.ObjectId(req.body.pid)
    }
    req.body.add_time = getUnix()
    const result = new ArticleCateModel(req.body)
    await result.save()
    res.redirect(`/${req.app.locals.adminPath}/articleCate`)
})

module.exports = router