const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("用户登陆页面")
})
router.get("/dologin", (req, res) => {
    res.send("执行登陆")
})

module.exports = router