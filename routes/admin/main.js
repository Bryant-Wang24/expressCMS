const express = require("express")
const FocusModel = require('../../model/focusModel')
const router = express.Router()

router.get("/", (req, res) => {
    res.render("admin/main/index.ejs")
})
router.get("/welcome", (req, res) => {
    res.send("欢迎来到后台管理中心")
})

router.get("/changeStatus", async (req, res) => {
    const id = req.query.id
    const field = req.query.field
    let json //要更新的数据
    const result = await FocusModel.find({ "_id": id })
    if (result.length > 0) {
        console.log('长度', result);
        const tempField = result[0][field]
        tempField === 1 ? json = { [field]: 0 } : json = { [field]: 1 }
        await FocusModel.updateOne({ "_id": id }, json)
        res.send({
            success: true,
            message: '修改状态成功'
        })
    } else {
        res.send({
            success: true,
            message: '修改状态失败'
        })
    }
})

module.exports = router