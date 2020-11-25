var express = require('express');
var router = express.Router();

const svgCaptcha = require("svg-captcha");

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44
    }
    var captcha = svgCaptcha.create(codeConfig);
    req.session.captcha = captcha.text.toLowerCase();
    console.log(captcha.text)
    res.send({
        data: captcha.data,
        msg: "",
        code: 200
    });
});

module.exports = router;
