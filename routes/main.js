/**
 * Created by Administrator on 2016/8/20.
 */

var express = require('express');
var router = express.Router();

var searchSong = require("../modules/searchSong");

router.get('/', function (req, res, next) {
    res.render('main');
});

router.post('/search', function (req, res, next) {
    searchSong.search(req, res, next)
});

router.post('/searchUrl', function (req, res, next) {
    searchSong.searchUrl(req, res, next)
});

module.exports = router;