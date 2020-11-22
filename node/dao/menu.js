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
            const sql = `SELECT * FROM menu WHERE id=ANY(SELECT menu_id FROM menu_role WHERE role_id=(SELECT role_id FROM role_user WHERE user_id=${user_id}))`
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
function getMenuAll() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM menu`
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
        if (!params.text || !params.type || !params.icon || !params.url) {
            if (!params.text) {
                err = "菜单名不能为空"
            } else if (!params.type) {
                err = "菜单类型不能为空"
            } else if (!params.icon) {
                err = "菜单图标不能为空"
            } else if (!params.url) {
                err = "菜单路径不能为空"
            }
            resolve({ err, code: 500, data: null, msg: err })
        } else {
            const sql = `INSERT INTO menu(text, url, parentId, type, icon) VALUE ("${params.text}", "${params.url}", "${params.parentId}", "${params.type}", "${params.icon}")`
            console.log(1111, sql)
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
module.exports = {
    getMenusDao: getMenus,
    getMenuAllDao: getMenuAll,
    addMenuDao: addMenu
}
