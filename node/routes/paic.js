var express = require('express');
var router = express.Router();

const { getPaicsService } = require("../service/paic")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const result = await getPaicsService()
    res.send(result);
});

module.exports = router;
