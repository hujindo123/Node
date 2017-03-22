/**
 * Created by Administrator on 2017/3/23.
 */
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('angular-ui-router/main')
})
module.exports = router;