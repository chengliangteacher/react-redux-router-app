var express = require('express');
var router = express.Router();

const { getSeatService } = require("../service/seat")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const result = await getSeatService()
    res.send(result);
});

module.exports = router;
