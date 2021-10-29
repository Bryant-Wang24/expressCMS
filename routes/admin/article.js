const express = require("express");
var router = express.Router();
const{multer} = require('../../model/tools')

router.get("/", async (req, res) => {

    res.render("admin/article/index.ejs")
})
router.get("/add", (req, res) => {
    res.render("admin/article/add.ejs")
})
router.post("/doUploadImage",multer().single('file'),(req,res)=>{
    const imgSrc = req.file?req.file.path.substr(7):''
    res.send({
        link:"/"+imgSrc
    })
})

module.exports = router