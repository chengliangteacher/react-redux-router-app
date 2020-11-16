const { getUsersDao, getUserDao } = require("../dao/user")
const getUsers = async () => {
    return await getUsersDao()
}
const getUser = async (id) => {
    return await getUserDao(id)
}
module.exports = {
    getUsersService: getUsers,
    getUserService: getUser,
}