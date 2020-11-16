const { ExpectationFailed } = require("http-errors");
const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()
function getRegulationPlans() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM regulation_plan"
        connection.query(sql, (err, rows) => {
            resolve({ err, code: 200, data: [...rows] })
        })
    })
}
module.exports = {
    getRegulationPlansDao: getRegulationPlans,
    
}
