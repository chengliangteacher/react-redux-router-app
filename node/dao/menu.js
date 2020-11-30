const mysql = require("mysql");
const $config = require("../mysql")
const connection = mysql.createConnection($config);
connection.connect()

function deepMenus(groupData, linkData) {
    if (linkData.length) {
        groupData.forEach(item => {
            if (item.type === "group") {
                item.children = linkData.filter(item2 => item2.parentId === item.id).map(item3 => {
                    return Object.assign(item3, { children: [], hasChildren: false, hasParent: true })
                });
                item.hasChildren = item.children.length ? true : false;
                item.icon = "";
                if (!item.parentId) {
                    item.hasParent = false;
                }
            } else {
                item.children = [];
                item.hasChildren = false;
                item.hasParent = false;
                item.icon = ""
            }
        })
        let feeData = linkData.filter(item => groupData.every(item2 => item.parentId !== item2.id && item.type !== "link"))
        let groupData2 = linkData.filter(item => item.type === "group").filter(item => !feeData.some(item2 => item2.id === item.id))
        let linkData2 = linkData.filter(item => item.type !== "group").concat(feeData);
        if (groupData2.length && linkData2.length) {
            deepMenus(groupData2, linkData2)
        }
    }
}
function getMenus(user_id) {
    return new Promise((resolve, reject) => {
        if (user_id) {
            const sql = `SELECT * FROM menu WHERE id=ANY(SELECT menu_id FROM menu_role WHERE role_id=(SELECT role_id FROM role_user WHERE user_id=${user_id})) ORDER BY menu.order`
            connection.query(sql, (err, rows) => {
                if (!err) {
                    let data = [...rows];
                    let groupData = [];
                    let linkData = [];
                    if (rows.length) {
                        groupData = data.filter(item => !item.parentId);
                        linkData = data.filter(item => item.parentId);
                        deepMenus(groupData, linkData)
                    }
                    resolve({ err, code: 200, data: [...groupData] })
                } else {
                    resolve({ err, code: 500, data: null, msg: err.sqlMessage ? err.sqlMessage : "服务器错误" })
                }
            })
        } else {
            resolve({ err: null, code: 401, data: null, msg: "请重新登录" })
        }
    })
}
function getMenuAll(params) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM menu ORDER BY menu.order`
        connection.query(sql, (err, rows) => {
            if (!err) {
                let data = [...rows];
                let groupData = [];
                let linkData = [];
                if (rows.length) {
                    groupData = data.filter(item => !item.parentId);
                    linkData = data.filter(item => item.parentId);
                    deepMenus(groupData, linkData)
                }
                resolve({ err, code: 200, data: [...groupData] })
            } else {
                resolve({ err, code: 500, data: null, msg: err.sqlMessage ? err.sqlMessage : "服务器错误" })
            }
        })
    })
}
//=====================================新增菜单====================================//
function addMenu(params) {
    return new Promise((resolve, reject) => {
        let err = "";
        if (!params.text || !params.type) {
            if (!params.text) {
                err = "菜单名不能为空"
            } else if (!params.type) {
                err = "菜单类型不能为空"
            } 
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const sql = `INSERT INTO menu(text, url, parentId, type, icon) VALUE ("${params.text}", "${params.url}", "${params.parentId}", "${params.type}", "${params.icon}")`
            connection.query(sql, (err, rows) => {
                if (!err) {
                    resolve({ err, code: 200, data: rows })
                } else {
                    resolve({ err, code: 500, data: null, msg: err.sqlMessage ? err.sqlMessage : "服务器错误" })
                }
            })
        }
    })
}
//=====================================编辑菜单====================================//
function editMenu(params) {
    return new Promise((resolve, reject) => {
        let err = "";
        if (!params.text || !params.type || !params.menuId) {
            if (!params.text) {
                err = "菜单名不能为空"
            } else if (!params.type) {
                err = "菜单类型不能为空"
            } else if (!params.menuId) {
                err = "菜单id不能为空"
            }
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const sql = `UPDATE menu SET text="${params.text}", type="${params.type}", icon="${params.icon}", url="${params.url}" WHERE id=${params.menuId}`
            connection.query(sql, (err, rows) => {
                if (!err) {
                    resolve({ err, code: 200, data: rows })
                } else {
                    resolve({ err, code: 500, data: null, msg: err.sqlMessage ? err.sqlMessage : "服务器错误" })
                }
            })
        }
    })
}

let ids = [];
function findMenuIds(data, id) {
    data.forEach(item => {
        if (item.parentId === Number(id)) {
            ids.push(item.id)
            if (item.hasChildren && item.children.length) {
                findMenuIds(item.children, item.id)
            }
        } else {
            if (item.hasChildren && item.children.length) {
                findMenuIds(item.children, id)
            }
        }
    })
}

//=====================================删除菜单====================================//
function deleteMenus(params) {
    return new Promise((resolve, reject) => {
        const menuSql = `SELECT * FROM menu`
        connection.query(menuSql, (err, rows) => {
            if (!err) {
                let data = [...rows];
                let groupData = [];
                let linkData = [];
                if (rows.length) {
                    groupData = data.filter(item => !item.parentId);
                    linkData = data.filter(item => item.parentId);
                    deepMenus(groupData, linkData)
                }
                ids = []
                findMenuIds(groupData, params.menuId)
                ids.push(params.menuId)
                const delSql = `DELETE FROM menu WHERE id IN (${ids.join(",")})`
                connection.query(delSql, (err2, rows2) => {
                    if (!err2) {
                        resolve({ err: err2, code: 200, data: rows2, msg: "删除成功" })
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
module.exports = {
    getMenusDao: getMenus,
    getMenuAllDao: getMenuAll,
    addMenuDao: addMenu,
    editMenuDao: editMenu,
    deleteMenusDao: deleteMenus
}
