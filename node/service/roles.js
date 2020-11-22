const { getRolesDao, addRolesDao, editRolesDao } = require("../dao/roles")
const getRoles = async () => {
    return await getRolesDao()
}
const addRoles = async (params) => {
    return await addRolesDao(params)
}
const editRoles = async (params) => {
    return await editRolesDao(params)
}
module.exports = {
    getRolesService: getRoles,
    addRolesService: addRoles,
    editRolesService: editRoles
}