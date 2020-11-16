var express = require('express');
var router = express.Router();

const { getRegulationPlansService } = require("../service/regulationPlans")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const result = await getRegulationPlansService()
    res.send(result);
});

module.exports = router;
