const { getPaicsDao } = require("../dao/paic")
const getPaics = async () => {
    return await getPaicsDao()
}
module.exports = {
    getPaicsService: getPaics,
}