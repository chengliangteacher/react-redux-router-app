const { getPlanTasksDao } = require("../dao/planTasks")
const getPlanTasks = async () => {
    return await getPlanTasksDao()
}
module.exports = {
    getPlanTasksService: getPlanTasks,
}