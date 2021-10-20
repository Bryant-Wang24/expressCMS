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

router.get("/edit", async(req, res) => {
    const id = req.query.id
    const result = await NavModel.find({"_id":id})
    if(result.length>0){
        res.render("admin/nav/edit.ejs",{
            list:result[0]
        })
    }else{
        res.render("/admin/nav")
    }
})
router.post("/doedit", async(req, res) => {
    try {
        await NavModel.updateOne({"_id":req.body.id},req.body)
        res.render('admin/public/success.ejs', {
        message: "修改数据成功",
        redirectUrl: '/admin/nav'
    })
    } catch (error) {
        res.render('admin/public/error.ejs', {
            message: "修改数据失败",
            redirectUrl: '/admin/nav/edit?id='+req.body.id
        })
    }     
})


module.exports = router