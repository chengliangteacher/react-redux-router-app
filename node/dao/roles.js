const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()
function getRoles(params) {
    return new Promise((resolve, reject) => {
        const pageNum = params.pageNum && params.pageSize ?  (Number(params.pageNum) - 1) * Number(params.pageSize) : 0; 
        const pageSize = params.pageSize ? Number(params.pageSize) : 20;
        const sql = `SELECT role.id, role.title, role.note, GROUP_CONCAT(menu_role.menu_id)menuIds,role.create_time, role.update_time FROM role LEFT JOIN menu_role ON role.id=menu_role.role_id GROUP BY role.id LIMIT ${pageNum}, ${pageSize} `
        console.log(sql)
        connection.query(sql, (err, rows) => {
            if (!err) {
                const sqlcouter = "SELECT COUNT(*)total FROM role"
                connection.query(sqlcouter, (err2, rows2) => {
                    if (!err2) {
                        rows.forEach(item => {
                            if (item.menuIds) {
                                item.menuIds = item.menuIds.split(",").map(item2 => Number(item2))
                            }
                        })
                        resolve({ err, code: 200, data: [...rows], total: rows2[0].total })
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
//=====================================编辑角色====================================//
function editRoles(params) {
    return new Promise((resolve, reject) => {
        let err = "";
        if (!params.roleId || !params.title || !params.note || !params.menuIds || !params.menuIds.length) {
            if (!params.title) {
                err = "角色名称不能为空"
            } else if (!params.note) {
                err = "角色备注不能为空"
            } else if (!params.roleId) {
                err = "角色id不能为空"
            } else if (!params.menuIds || !params.menuIds.length) {
                err = "角色菜单不能为空"
            }
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const rolesql = `UPDATE role SET title="${params.title}", note="${params.note}" WHERE id=${params.roleId}`
            connection.query(rolesql, (err, rows) => {
                if (!err) {
                    const values = params.menuIds.map(item => {
                        return [item, params.roleId]
                    })
                    const delsql = `DELETE FROM menu_role WHERE role_id=${params.roleId}`
                    connection.query(delsql, (err3, rows3) => {
                        if (!err3) {
                            const roleMenuSql = `insert into menu_role(menu_id, role_id) values ?`
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
function deleteRoles(params) {
    return new Promise((resolve, reject) => {
        let err = "";
        if (!params.roleId) {
            if (!params.title) {
                err = "角色id不能为空"
            }
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const rolesql = `DELETE role, menu_role, role_user FROM role, menu_role, role_user WHERE role.id=${params.roleId} AND menu_role.role_id=${params.roleId} AND role_user.role_id=${params.roleId}`
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
    getRolesDao: getRoles,
    addRolesDao: addRoles,
    editRolesDao: editRoles,
    deleteRolesDao: deleteRoles
}
