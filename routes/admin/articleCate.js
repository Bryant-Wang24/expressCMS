const express = require('express')
const { getUnix } = require("../../model/tools")
const ArticleCateModel = require("../../model/articleCateModel")
const mongoose = require('../../model/core')

const router = express.Router()
router.get("/", async (req, res) => {
    const result = await ArticleCateModel.aggregate([
        {
            $lookup:{
                from:"article_cate",
                localField:"_id",
                foreignField:"pid",
                as:"items"
            }
        },
        {
            $match:{
                pid:"0"
            }
        }
    ])
    res.render("admin/articleCate/index.ejs", {
        list: result
    })
})
router.get("/add", async (req, res) => {
    // 获取顶级分类
    const topCateList = await ArticleCateModel.find({ "pid": "0" })
    console.log('topCateList',topCateList);
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

router.get("/edit", async (req, res) => {
    const id = req.query.id
    console.log('id',id);
    const result = await ArticleCateModel.find({"_id":id})
    const topCateList = await ArticleCateModel.find({ "pid": "0" })
    console.log('result',result);
    res.render("admin/articleCate/edit.ejs",{
        list:result[0],
        cateList:topCateList
    })
})

module.exports = router