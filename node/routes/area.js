var express = require('express');
var router = express.Router();

const { getAreasService } = require("../service/area")

/* GET users listing. */
router.get('/allTwo', async function (req, res, next) {
    const result = await getAreasService()
    res.send(result);
});

module.exports = router;
