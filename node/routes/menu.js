var express = require('express');
var router = express.Router();

const { getMenusService, getMenusAllService, addMenuService } = require("../service/menu")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const result = await getMenusService(req.session.user_id)
    res.send(result);
});
router.get('/all', async function (req, res, next) {
    const result = await getMenusAllService()
    res.send(result);
});
router.post('/', async function (req, res, next) {
    const result = await addMenuService(req.body)
    res.send(result);
});

module.exports = router;
