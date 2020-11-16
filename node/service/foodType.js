const { getFoodTypesDao } = require("../dao/foodType")
const getFoodTypes = async () => {
    return await getFoodTypesDao()
}
module.exports = {
    getFoodTypesService: getFoodTypes,
}