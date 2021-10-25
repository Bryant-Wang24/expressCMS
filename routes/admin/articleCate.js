const express = require('express')
const { getUnix } = require("../../model/tools")
const ArticleCateModel = require("../../model/articleCateModel")

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

})

module.exports = router