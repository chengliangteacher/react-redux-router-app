const fs = require("fs")
function uploadFile(req) {
    return new Promise((resolve, reject) => {
        console.log(req.file.path)
        fs.rename(req.file.path, "node/uploads/" + req.file.originalname, function (err) {
            if (err) {
                resolve({ err, code: 500, data: null, msg: "图片上传失败" })
                return;
            }
            let data = req.file;
            // let photo = req.file.path;
            resolve({ err, code: 200, data })
        })
    })
}

module.exports = {
    uploadFileDao: uploadFile,
}