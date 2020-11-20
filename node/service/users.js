const { getUsersDao, getUserDao, addUsersDao } = require("../dao/user")
const getUsers = async () => {
    return await getUsersDao()
}
const getUser = async (id) => {
    return await getUserDao(id)
}
const addUsers = async (params) => {
    return await addUsersDao(params)
}
module.exports = {
    getUsersService: getUsers,
    getUserService: getUser,
    addUsersService: addUsers,
}