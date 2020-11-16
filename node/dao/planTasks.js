const { ExpectationFailed } = require("http-errors");
const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()
function getPlanTasks() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM plan_task"
        connection.query(sql, (err, rows) => {
            resolve({ err, code: 200, data: [...rows] })
        })
    })
}
module.exports = {
    getPlanTasksDao: getPlanTasks,
    
}
