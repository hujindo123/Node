var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(111)
    res.render('play');
});

module.exports = router;
