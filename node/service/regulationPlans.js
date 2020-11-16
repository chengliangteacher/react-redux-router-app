const { getRegulationPlansDao } = require("../dao/regulationPlans")
const getRegulationPlans = async () => {
    return await getRegulationPlansDao()
}
module.exports = {
    getRegulationPlansService: getRegulationPlans,
}