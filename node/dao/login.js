const { ExpectationFailed } = require("http-errors");
const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()
function login(params) {
    console.log(params);
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from user WHERE username='${params.username}' and password=${params.password}`
        connection.query(sql, (err, rows) => {
            console.log(err)
            if (err) {
                resolve({
                    success: false,
                    data: null,
                    err,
                    msg: "用户名密码错误",
                    code: 500
                })
                return;
            }
            resolve({
                success: rows.length ? true : false,
                data: rows,
                err,
                msg: rows.length ? "登录成功" : "用户名或密码错误",
                code: rows.length ? 200 : 500
            })

        })
    })
}
module.exports = {
    loginDao: login,

}
