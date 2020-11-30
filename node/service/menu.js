const { getMenusDao, getMenuAllDao, addMenuDao, editMenuDao,deleteMenusDao } = require("../dao/menu")
const getMenus = async (user_id) => {
    return await getMenusDao(user_id)
}
const getMenusAll = async (params) => {
    return await getMenuAllDao(params)
}
const addMenu = async (params) => {
    return await addMenuDao(params)
}
const editMenu = async (params) => {
    return await editMenuDao(params)
}
const deleteMenus = async (params) => {
    return await deleteMenusDao(params)
}
module.exports = {
    getMenusService: getMenus,
    getMenusAllService: getMenusAll,
    addMenuService: addMenu,
    editMenuService: editMenu,
    deleteMenusService: deleteMenus,
}