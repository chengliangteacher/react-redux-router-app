const { getCompanysDao } = require("../dao/companys")
const getCompanys = async () => {
    return await getCompanysDao()
}
module.exports = {
    getCompanysService: getCompanys,
}