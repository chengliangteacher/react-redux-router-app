const { getOrganizationsDao } = require("../dao/organizations")
const getOrganizations = async () => {
    return await getOrganizationsDao()
}
module.exports = {
    getOrganizationsService: getOrganizations,
}