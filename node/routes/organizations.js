var express = require('express');
var router = express.Router();

const { getOrganizationsService } = require("../service/organizations")

/* GET users listing. */
router.get('/organizations', async function (req, res, next) {
    const result = await getOrganizationsService()
    res.send(result);
});
module.exports = router;
