var express = require('express');
var router = express.Router();

const { getMenusService, getMenusAllService, addMenuService, editMenuService, deleteMenusService } = require("../service/menu")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const result = await getMenusService(req.session.user_id)
    res.send(result);
});
router.get('/all', async function (req, res, next) {
    const result = await getMenusAllService(req.params)
    res.send(result);
});
router.post('/', async function (req, res, next) {
    const result = await addMenuService(req.body)
    res.send(result);
});
router.post('/:id', async function (req, res, next) {
    const result = await editMenuService({ ...req.body, menuId: req.params.id })
    res.send(result);
});
router.delete('/:id', async function (req, res, next) {
    const result = await deleteMenusService({ menuId: req.params.id })
    res.send(result);
});

module.exports = router;
