var express = require('express');
var router = express.Router();
const { getUsersService, getUserService } = require("../service/users")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const result = await getUsersService()
    res.send(result);
});

router.get('/:id', async function (req, res, next) {
    const id = req.params.id
    const result = await getUserService(id)
    res.send(result);
});

module.exports = router;
