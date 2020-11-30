const { getUsersDao, getUserDao, addUsersDao, editUsersDao, deleteUsersDao } = require("../dao/user")
const getUsers = async (params) => {
    return await getUsersDao(params)
}
const getUser = async (id) => {
    return await getUserDao(id)
}
const addUsers = async (params) => {
    return await addUsersDao(params)
}
const editUsers = async (params) => {
    return await editUsersDao(params)
}
const deleteUsers = async (params) => {
    return await deleteUsersDao(params)
}
module.exports = {
    getUsersService: getUsers,
    getUserService: getUser,
    addUsersService: addUsers,
    editUsersService: editUsers,
    deleteUsersService: deleteUsers
}