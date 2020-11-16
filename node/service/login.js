const { loginDao } = require("../dao/login")
const login = async (params) => {
    return await loginDao(params)
}
module.exports = {
    loginService: login,
}