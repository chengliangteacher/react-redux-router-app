var express = require('express');
var router = express.Router();
const { getRolesService, addRolesService, editRolesService, deleteRolesService } = require("../service/roles")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const result = await getRolesService(req.query)
    res.send(result);
});

//=====================================新增====================================//
router.post('/', async function (req, res, next) {
    const result = await addRolesService(req.body)
    res.send(result);
});
//=====================================编辑====================================//
router.post('/:id', async function (req, res, next) {
    const result = await editRolesService({ ...req.body, roleId: req.params.id })
    res.send(result);
});
//=====================================编辑====================================//
router.delete('/:id', async function (req, res, next) {
    const result = await deleteRolesService({ roleId: req.params.id })
    res.send(result);
});

module.exports = router;
