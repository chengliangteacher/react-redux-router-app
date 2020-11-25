var express = require('express');
var router = express.Router();
const path = require("path")

router.get("/:filename", function(req, res) {
    res.sendFile(path.join(__dirname, "../") + "/uploads" + req.url);
})

module.exports = router;
