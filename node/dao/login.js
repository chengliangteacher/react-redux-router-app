const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()
function login(params) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from user WHERE username='${params.username}' and password=${params.password}`
        connection.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    success: rows.length ? true : false,
                    data: rows.length ? rows[0] : {},
                    err,
                    msg: rows.length ? "登录成功" : "用户名或密码错误",
                    code: rows.length ? 200 : 500
                })

            } else {
                resolve({
                    success: false,
                    data: null,
                    err,
                    msg: "用户名密码错误",
                    code: 500
                })
            }
        })
    })
}
module.exports = {
    loginDao: login,

}
