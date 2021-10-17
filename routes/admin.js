const express = require("express")
const router = express.Router()
const url = require("url")

// 中间件，权限验证，判断session是否存在
router.use((req, res, next) => {
    console.log('权限', req.url);
    const pathname = url.parse(req.url).pathname
    if (req.session.userinfo && req.session.userinfo.username) {// session存在
        next()
    } else {//session不存在
        if (pathname == "/login" || pathname == "/login/dologin" || pathname == "/login/verify") {

            next()//如果是登陆页面,则继续向下执行
        } else {
            res.redirect("/admin/login")//如果不是登陆页面,则重定向到登陆页面
        }
    }
})

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