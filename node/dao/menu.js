const { ExpectationFailed } = require("http-errors");
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
        let groupData2 = linkData.filter(item => item.type === "group")
        let linkData2 = linkData.filter(item => item.type !== "group")
        if (groupData2.length && linkData2.length) {
            deepMenus(groupData2, linkData2)
        }
    }
}
function getMenus() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM menu"
        connection.query(sql, (err, rows) => {
            let data = [...rows];
            let groupData = [];
            let linkData = [];
            if (rows.length) {
                groupData = data.filter(item => !item.parentId);
                linkData = data.filter(item => item.parentId);
                deepMenus(groupData, linkData)
            }
            resolve({ err, code: 200, data: [...groupData] })
        })
    })
}
module.exports = {
    getMenusDao: getMenus,
}
