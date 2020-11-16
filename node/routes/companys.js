var express = require('express');
var router = express.Router();

const { getCompanysService } = require("../service/companys")

/* GET users listing. */
router.get('/companys', async function (req, res, next) {
    const result = await getCompanysService()
    res.send(result);
});

module.exports = router;
