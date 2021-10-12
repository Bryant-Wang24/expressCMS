const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("管理员管理")
})
router.get("/add", (req, res) => {
    res.send("增加管理员")
})

module.exports = router