const { getRolesDao, addRolesDao, editRolesDao, deleteRolesDao } = require("../dao/roles")
const getRoles = async () => {
    return await getRolesDao()
}
const addRoles = async (params) => {
    return await addRolesDao(params)
}
const editRoles = async (params) => {
    return await editRolesDao(params)
}
const deleteRoles = async (params) => {
    return await deleteRolesDao(params)
}
module.exports = {
    getRolesService: getRoles,
    addRolesService: addRoles,
    editRolesService: editRoles,
    deleteRolesService: deleteRoles
}