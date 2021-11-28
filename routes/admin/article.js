const express = require("express");
var router = express.Router();
const ArticleCateModel = require("../../model/articleCateModel")
const ArticleModel = require("../../model/articleModel")
const { multer } = require('../../model/tools')

router.get("/", async (req, res) => {
    const result = await ArticleModel.find({})
    res.render("admin/article/index.ejs", {
        list: result
    })
})
router.get("/add", async (req, res) => {
    const result = await ArticleCateModel.aggregate([
        {
            $lookup: {
                from: "article_cate",
                localField: "_id",
                foreignField: "pid",
                as: "items"
            }
        },
        {
            $match: {
                pid: "0"
            }
        }
    ])
    res.render("admin/article/add.ejs", {
        articleCate: result
    })
})

router.post("/doAdd", multer().single('article_img'), async (req, res) => {
    const imgSrc = req.file ? req.file.path.substr(7) : ''
    const result = new ArticleModel(Object.assign(req.body, { "article_img": imgSrc }))
    console.log('result', result);
    await result.save()
    res.redirect(`/${req.app.locals.adminPath}/article`)
})

router.get("/edit", async (req, res) => {
    // 获取要修改的数据
    const id = req.query.id
    const articleResult = await ArticleModel.find({ "_id": id })
    console.log('数据', articleResult);
    // 获取分类信息
    const cateResult = await ArticleCateModel.aggregate([
        {
            $lookup: {
                from: "article_cate",
                localField: "_id",
                foreignField: "pid",
                as: "items"
            }
        },
        {
            $match: {
                pid: "0"
            }
        }
    ])
    res.render("admin/article/edit.ejs", {
        articleCate: cateResult,
        list: articleResult[0]
    })
})

router.post("/doEdit", multer().single('article_img'), async (req, res) => {
    try {
        if (req.file) {
            const imgSrc = req.file ? req.file.path.substr(7) : ''
            await ArticleModel.updateOne({ "id": req.body.id }, Object.assign(req.body, { "article_img": imgSrc }))
        } else {
            await ArticleModel.updateOne({ "id": req.body.id }, req.body)
        }
        res.redirect(`/${req.app.locals.adminPath}/article`)
    } catch (error) {
        res.render("admin/public/error.ejs", {
            "redirectUrl": `/${req.app.locals.adminPath}/article/edit?id=${req.body.id}`,
            "message": "修改数据失败"
        })
    }

})





// 富文本编辑器上传图片
router.post("/doUploadImage", multer().single('file'), (req, res) => {
    const imgSrc = req.file ? req.file.path.substr(7) : ''
    res.send({
        link: "/" + imgSrc
    })
})

module.exports = router