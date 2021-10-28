const express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {

    res.render("admin/article/index.ejs")
})
router.get("/add", (req, res) => {
    res.render("admin/article/add.ejs")
})


module.exports = router