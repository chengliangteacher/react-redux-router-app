const { getAreasDao } = require("../dao/area")
const getAreas = async () => {
    return await getAreasDao()
}
module.exports = {
    getAreasService: getAreas,
}