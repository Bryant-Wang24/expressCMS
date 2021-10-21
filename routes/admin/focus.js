const express = require("express")
const focusModel = require("../../model/focusModel")
const { multer } = require("../../model/tools")
const router = express.Router()

router.get("/", async (req, res) => {
    const result = await focusModel.find({})
    res.render("admin/focus/index.ejs", {
        list: result
    })
})

router.get('/add', (req, res) => {
    res.render("admin/focus/add.ejs")
})

router.post('/doadd', multer().single('focus_img'), async (req, res) => {
    console.log(req.file);
    const focus_img = req.file ? req.file.path.substr(7) : ""
    const result = new focusModel((Object.assign(req.body, { "focus_img": focus_img })))
    await result.save()
    res.redirect("/admin/focus")
})

// 修改数据
router.get("/edit", async (req, res) => {
    const id = req.query.id
    const result = await focusModel.find({"_id":id})
    res.render("admin/focus/edit.ejs", {
        list: result[0]
    })
})
// 提交修改的数据
router.post("/doedit",multer().single('focus_img'), async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    // await focusModel.updateOne({"_id":req.body.id},req.body)
    if(req.file){//如果修改了图片
        const focus_img = req.file?req.file.path.substr(7):""
        console.log(focus_img);
        await focusModel.updateOne({"_id":req.body.id},Object.assign(req.body,{"focus_img":focus_img}))
    }else{//如果没有修改图片
        await focusModel.updateOne({"_id":req.body.id},req.body)
    }
    res.redirect("/admin/focus")

})

// 删除数据
router.get("/delete", async (req, res) => {
    const id = req.query.id
    const result = await focusModel.deleteOne({"_id":id})
    console.log(result);
    res.render('admin/public/success.ejs', {
        message: "删除数据成功",
        redirectUrl: '/admin/focus'
    })
})

module.exports = router