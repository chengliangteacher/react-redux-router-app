const { ExpectationFailed } = require("http-errors");
const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()
function getFoodTypes() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM food_type"
        connection.query(sql, (err, rows) => {
            resolve({ err, code: 200, data: [...rows] })
        })
    })
}
module.exports = {
    getFoodTypesDao: getFoodTypes,
    
}
