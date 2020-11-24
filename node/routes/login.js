var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

const { loginService } = require("../service/login")

/* GET users listing. */
router.post('/', async function (req, res, next) {
    if (!req.body.code) {
        res.send({
            code: 500,
            msg: "请输入验证码",
            data: null
        })
        return
    }
    if (req.body.code !== req.session.captcha) {
        res.send({
            code: 500,
            msg: "验证码错误",
            data: null
        })
        return;
    }
    const result = await loginService({ ...req.body })
    let token = null
    if (result.success) {
        token = 'Bearer ' + jwt.sign(
            {
                id: result.data.id,
                username: result.data.username
            },
            'token',
            {
                expiresIn: 3600
            }
        )

    }
    req.session.user_id = result.data.id;
    res.send({ ...result, token });
});

module.exports = router;
