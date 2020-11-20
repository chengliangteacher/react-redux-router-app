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
//=====================================新增用户====================================//
function addUsers(params) {
    console.log(params)
    return new Promise((resolve, reject) => {
        let err = "";
        if (!params.name || !params.username || !params.password || !params.sex || params.status === null || params.status === undefined || !params.roleIds || !params.roleIds.length) {
            if (!params.name) {
                err = "用户名称不能为空"
            } else if (!params.username) {
                err = "登录名不能为空"
            } else if (!params.password) {
                err = "密码不能为空"
            }else if(!params.sex) {
                err = "性别不能为空"
            } else if(params.status === null || params.status === undefined) {
                err = "启用状态不能为空"
            } else if (!params.roleIds || !params.roleIds.length) {
                err = "角色不能为空"
            }
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const rolesql = `INSERT INTO user(name, username, password, sex, status, QQ) VALUE ("${params.name}", "${params.username}", "${params.password}", "${params.sex}", "${params.status}", "${params.QQ}")`
            connection.query(rolesql, (err, rows) => {
                if (!err) {
                    if (rows && rows.insertId) {
                        const values = params.roleIds.map(item => {
                            return [item, rows.insertId]
                        })
                        const roleMenuSql = `insert into role_user(role_id, user_id) values ?`
                        connection.query(roleMenuSql, [values], (err2, rows2) => {
                            if (!err2) {
                                resolve({ err, code: 200, data: rows2 })
                            } else {
                                resolve({ err2, code: 500, data: null, msg: err2.sqlMessage ? err2.sqlMessage : "服务器错误" })
                            }
                        })
                    } else {
                        resolve({ err, code: 500, data: null, msg: err.sqlMessage ? err.sqlMessage : "角色新增失败" })
                    }
                } else {
                    resolve({ err, code: 500, data: null, msg: err.sqlMessage ? err.sqlMessage : "服务器错误" })
                }
            })
        }
    })
}
module.exports = {
    getUsersDao: getUsers,
    getUserDao: getUser,
    addUsersDao: addUsers
}
