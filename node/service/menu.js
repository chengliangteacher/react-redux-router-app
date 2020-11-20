const { getMenusDao, getMenuAllDao, addMenuDao } = require("../dao/menu")
const getMenus = async (user_id) => {
    return await getMenusDao(user_id)
}
const getMenusAll = async () => {
    return await getMenuAllDao()
}
const addMenu = async (params) => {
    return await addMenuDao(params)
}
module.exports = {
    getMenusService: getMenus,
    getMenusAllService: getMenusAll,
    addMenuService: addMenu
}