var express = require('express');
var router = express.Router();

const { getPlanTasksService } = require("../service/planTasks")

/* GET users listing. */
router.get('/planTypes', async function (req, res, next) {
    const result = await getPlanTasksService()
    res.send(result);
});

module.exports = router;
