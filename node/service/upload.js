const { uploadFileDao } = require("../dao/upload")
const uploadFile = async (req) => {
    return await uploadFileDao(req)
}
module.exports = {
    uploadFileService: uploadFile,
}