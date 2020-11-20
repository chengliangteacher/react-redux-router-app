const { getRolesDao, addRolesDao } = require("../dao/roles")
const getRoles = async () => {
    return await getRolesDao()
}
const addRoles = async (params) => {
    return await addRolesDao(params)
}
module.exports = {
    getRolesService: getRoles,
    addRolesService: addRoles
}