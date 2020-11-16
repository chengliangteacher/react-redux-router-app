var express = require('express');
var router = express.Router();

const { getMenusService } = require("../service/menu")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    console.log(req.user.admin)
    const result = await getMenusService()
    res.send(result);
});

module.exports = router;
