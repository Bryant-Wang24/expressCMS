const express = require("express")
const router = express.Router()

// 引入模块
const login = require("./admin/login")
const nav = require("./admin/nav")
const user = require("./admin/user")
const manager = require('./admin/manager')
const main = require("./admin/main")



// router.get("/", (req, res) => {
//     res.render("admin/login/login.ejs")
// })

// 挂载路由
router.use('/', main)
router.use('/login', login)
router.use('/nav', nav)
router.use('/manager', manager)
router.use('/user', user)


module.exports = router