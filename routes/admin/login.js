const express = require("express")
const router = express.Router()
var svgCaptcha = require('svg-captcha');

router.get("/", (req, res) => {
    // res.send("用户登陆页面")
    res.render("admin/login/login.ejs")
})


router.get("/dologin", (req, res) => {
    res.send("执行登陆")
})

router.get('/verify', function (req, res) {
    var captcha = svgCaptcha.create();
    // req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});
module.exports = router