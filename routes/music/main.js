/**
 * Created by Administrator on 2017/3/17.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('music/main');
});


module.exports = router;