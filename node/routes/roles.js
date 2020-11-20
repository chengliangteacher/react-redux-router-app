var express = require('express');
var router = express.Router();
const { getRolesService, addRolesService } = require("../service/roles")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const result = await getRolesService()
    res.send(result);
});

//=====================================新增====================================//
router.post('/', async function (req, res, next) {
    const result = await addRolesService(req.body)
    res.send(result);
});

module.exports = router;
