/**
 * Created by Administrator on 2016/8/20.
 */

var express = require('express');
var router = express.Router();

var searchSong = require("../modules/searchSong");

router.get('/', function (req, res, next) {
   /* if(req.session.user){
        console.log('登录成功');
        console.log(req.session.user);
        res.render('main');
    }else {
        console.log('还未登录');
        res.redirect('/login');
    }*/
    res.render('main');

});


router.post('/search', function (req, res, next) {
    searchSong.search(req, res, next)
});

router.post('/searchUrl', function (req, res, next) {
    searchSong.searchUrl(req, res, next)
});

module.exports = router;