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
        res.send("验证码错误")
        return
    }
    res.send("验证成功")
})

router.get('/verify', function (req, res) {
    var captcha = svgCaptcha.create();
    console.log('验证码内容', captcha.text);
    req.session.captcha = captcha.text;//保存验证码
    res.type('svg');
    res.status(200).send(captcha.data);
});
module.exports = router