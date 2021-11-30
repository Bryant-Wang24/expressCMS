const express = require("express")
const SettingModel = require("../../model/settingModel")
const { multer } = require("../../model/tools")
const router = express.Router()

router.get("/", async (req, res) => {
    const result = await SettingModel.find({})
    res.render("admin/setting/index.ejs", {
        list: result[0]
    })
})


// 提交修改的数据
router.post("/doedit", multer().single('focus_img'), async (req, res) => {
   
    res.send("执行增加")

})

module.exports = router