var express = require('express');
var router = express.Router();
const { uploadFileService } = require("../service/upload")
const fs = require("fs")
const multer = require("multer")
let createFolder = function (folder) {
    try {
        fs.accessSync(folder)
    } catch (e) {
        fs.mkdirSync(folder);
    }
}
let uploadFolder = "./node/uploads/";
createFolder(uploadFolder);
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
let upload = multer({ storage });
/* GET users listing. */
router.post('/', upload.single("file"), async function (req, res, next) {
    const result = await uploadFileService(req)
    res.send(result);
});

module.exports = router;
