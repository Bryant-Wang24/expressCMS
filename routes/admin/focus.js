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
    const focus_img = req.file ? req.file.path : ""
    const result = new focusModel((Object.assign(req.body, { "focus_img": focus_img })))
    await result.save()
    res.redirect("/admin/focus")
})

module.exports = router