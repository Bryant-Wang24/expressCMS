const express = require("express")
const router = express.Router()
var svgCaptcha = require('svg-captcha');

router.get("/", (req, res) => {
    // res.send("用户登陆页面")
    res.render("admin/login/login.ejs")
})


router.post("/dologin", (req, res) => {
    // const username = req.body.username
    // const password = req.body.password
    const verify = req.body.verify
    console.log(verify, req.session.captcha);
    // 1、判断用户名密码是否合法

    // 2、判断验证码是否正确
    if (verify.toLowerCase() !== req.session.captcha.toLowerCase()) {
        // 图形验证码失败
        res.render("admin/public/error.ejs", {
            "redirectUrl": "/admin/login",//失败后跳转到原页面
            "message": "图形验证码输入错误"
        })
        return
    }
    // 图形验证码成功
    res.render("admin/public/success.ejs", {
        "redirectUrl": "/admin",//成功后跳转的页面
        "message": "登陆成功"
    })
})

router.get('/verify', function (req, res) {
    var captcha = svgCaptcha.create();
    console.log('验证码内容', captcha.text);
    req.session.captcha = captcha.text;//保存验证码
    res.type('svg');
    res.status(200).send(captcha.data);
});
module.exports = router