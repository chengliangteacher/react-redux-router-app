const { ExpectationFailed } = require("http-errors");
const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()
function getUsers() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user"
        connection.query(sql, (err, rows) => {
            resolve({ err, code: 200, data: [...rows] })
        })
    })
}
function getUser(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE id=${id}`
        connection.query(sql, (err, rows) => {
            resolve({ err, code: 200, data: [...rows] })
        })
    })
}
module.exports = {
    getUsersDao: getUsers,
    getUserDao: getUser
    
}
