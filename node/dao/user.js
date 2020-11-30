const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()
function getUsers(params) {
    return new Promise((resolve, reject) => {
        const pageNum = params.pageNum && params.pageSize ? (Number(params.pageNum) - 1) * Number(params.pageSize) : 0;
        const pageSize = params.pageSize ? Number(params.pageSize) : 20;
        const sql = `SELECT user.id, user.create_time, user.QQ, user.status, user.update_time, user.sex, user.name, user.username, user.avatar, GROUP_CONCAT(role_user.role_id)roleIds FROM user LEFT JOIN role_user ON user.id=role_user.user_id GROUP BY user.id LIMIT ${pageNum}, ${pageSize} `
        connection.query(sql, (err, rows) => {
            if (!err) {
                const sqlcouter = "SELECT COUNT(*)total FROM user"
                connection.query(sqlcouter, (err2, rows2) => {
                    if (!err2) {
                        const data = rows.map(item => Object.assign(item, { roleIds: item.roleIds.split(",").map(item2 => Number(item2)) }))
                        resolve({ err, code: 200, data: [...data], total: rows2[0].total })
                    } else {
                        resolve({ err: err2, code: 500, data: null, msg: err2.sqlMessage ? err2.sqlMessage : "服务器错误" })
                    }
                })
            } else {
                resolve({ err, code: 500, data: null, msg: err.sqlMessage ? err.sqlMessage : "服务器错误" })
            }
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
    return new Promise((resolve, reject) => {
        let err = "";
        if (!params.name || !params.username || !params.password || !params.sex || params.status === null || params.status === undefined || !params.roleIds || !params.roleIds.length) {
            if (!params.name) {
                err = "用户名称不能为空"
            } else if (!params.username) {
                err = "登录名不能为空"
            } else if (!params.password) {
                err = "密码不能为空"
            } else if (!params.sex) {
                err = "性别不能为空"
            } else if (params.status === null || params.status === undefined) {
                err = "启用状态不能为空"
            } else if (!params.roleIds || !params.roleIds.length) {
                err = "角色不能为空"
            }
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const rolesql = `INSERT INTO user(name, username, password, sex, status, QQ, avatar) VALUE ("${params.name}", "${params.username}", "${params.password}", "${params.sex}", "${params.status}", "${params.QQ}", "${params.avatar}")`
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

//=====================================编辑用户====================================//
function editUsers(params) {
    return new Promise((resolve, reject) => {
        let err = "";
        if (!params.userId || !params.name || !params.username || !params.sex || !params.roleIds.length || !params.QQ || params.status === null || params.status === undefined) {
            if (!params.userId) {
                err = "用户id不能为空"
            } else if (!params.name) {
                err = "用户姓名不能为空"
            } else if (!params.username) {
                err = "用户登录名不能为空"
            } else if (!params.sex) {
                err = "用户性别不能为空"
            } else if (!params.QQ) {
                err = "用户QQ号不能为空"
            } else if (params.status === null || params.status === undefined) {
                err = "用户启用状态不能为空"
            } else if (!params.roleIds || !params.roleIds.length) {
                err = "用户角色不能为空"
            }
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const rolesql = `UPDATE user SET name="${params.name}", username="${params.username}", sex="${params.sex}", QQ="${params.QQ}", status="${params.status}", password="${params.password}", avatar="${params.avatar}" WHERE id=${params.userId}`
            connection.query(rolesql, (err, rows) => {
                if (!err) {
                    const values = params.roleIds.map(item => {
                        return [item, params.userId]
                    })
                    const delsql = `DELETE FROM role_user WHERE user_id=${params.userId}`
                    connection.query(delsql, (err3, rows3) => {
                        if (!err3) {
                            const roleMenuSql = `insert into role_user(role_id, user_id) values ?`
                            connection.query(roleMenuSql, [values], (err2, rows2) => {
                                if (!err2) {
                                    resolve({ err, code: 200, data: rows2 })
                                } else {
                                    resolve({ err2, code: 500, data: null, msg: err2.sqlMessage ? err2.sqlMessage : "服务器错误" })
                                }
                            })
                        } else {
                            resolve({ err3, code: 500, data: null, msg: err3.sqlMessage ? err3.sqlMessage : "服务器错误" })
                        }
                    })
                } else {
                    resolve({ err, code: 500, data: null, msg: err.sqlMessage ? err.sqlMessage : "服务器错误" })
                }
            })

        }
    })
}

//=====================================新增角色====================================//
function deleteUsers(params) {

    return new Promise((resolve, reject) => {
        let err = "";
        if (!params.userId) {
            if (!params.userId) {
                err = "用户id不能为空"
            }
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const rolesql = `DELETE user, role_user FROM user, role_user WHERE user.id=${params.userId} AND role_user.user_id=${params.userId}`
            connection.query(rolesql, (err, rows) => {
                if (!err) {
                    resolve({ err, code: 200, data: rows, msg: "删除成功" })
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
    addUsersDao: addUsers,
    editUsersDao: editUsers,
    deleteUsersDao: deleteUsers
}
