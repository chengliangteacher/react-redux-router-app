var express = require('express');
var router = express.Router();

const { getFoodTypesService } = require("../service/foodType")

/* GET users listing. */
router.get('/all', async function (req, res, next) {
    const result = await getFoodTypesService()
    res.send(result);
});

module.exports = router;
