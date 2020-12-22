const { getSeatDao } = require("../dao/seat")
const getSeat = async () => {
    return await getSeatDao()
}
module.exports = {
    getSeatService: getSeat,
}