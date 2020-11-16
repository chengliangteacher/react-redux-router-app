const { getMenusDao } = require("../dao/menu")
const getMenus = async () => {
    return await getMenusDao()
}
module.exports = {
    getMenusService: getMenus,
}