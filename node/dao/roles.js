const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()
function getRoles() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM role"
        connection.query(sql, (err, rows) => {
            if (!err) {
                resolve({ err, code: 200, data: [...rows] })
            } else {
                resolve({ err, code: 500, data: null, msg: err.sqlMessage ? err.sqlMessage : "服务器错误" })
            }
        })
    })
}
//=====================================新增角色====================================//
function addRoles(params) {
    return new Promise((resolve, reject) => {
        let err = "";
        if (!params.title || !params.note || !params.menuIds || !params.menuIds.length) {
            if (!params.title) {
                err = "角色名称不能为空"
            } else if (!params.note) {
                err = "角色备注不能为空"
            } else if (!params.menuIds || !params.menuIds.length) {
                err = "角色菜单不能为空"
            }
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const rolesql = `INSERT INTO role(title, note) VALUE ("${params.title}", "${params.note}")`
            connection.query(rolesql, (err, rows) => {
                if (!err) {
                    if (rows && rows.insertId) {
                        const values = params.menuIds.map(item => {
                            return [item, rows.insertId]
                        })
                        console.log(values);
                        const roleMenuSql = `insert into menu_role(menu_id, role_id) values ?`
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
    getRolesDao: getRoles,
    addRolesDao: addRoles
}
