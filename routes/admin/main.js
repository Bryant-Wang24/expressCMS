const express = require("express")
const FocusModel = require('../../model/focusModel')
const NavModel = require('../../model/navModel')
const ManagerModel = require('../../model/managerModel')
const router = express.Router()

const appModel = {
    FocusModel,
    NavModel,
    ManagerModel//缩写  ManagerModel:ManagerModel
}

router.get("/", (req, res) => {
    res.render("admin/main/index.ejs")
})
router.get("/welcome", (req, res) => {
    res.send("欢迎来到后台管理中心")
})

router.get("/changeStatus", async (req, res) => {
    const id = req.query.id
    const model = req.query.model + "Model"
    const field = req.query.field//要修改的字段
    let json //要更新的数据
    const result = await appModel[model].find({ "_id": id })
    if (result.length > 0) {
        const tempField = result[0][field]
        tempField === 1 ? json = { [field]: 0 } : json = { [field]: 1 }//es6里的属性名表达式
        await appModel[model].updateOne({ "_id": id }, json)
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