var express = require('express');
var router = express.Router();
var userMessage = require('../../modules/userMessage');

/*var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
    var spriteData = gulp.src('images/!*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('path/to/output/'));
});*/
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('user/login',{title:'登录'});
});

router.post('/add',function (req, res, next) {
    userMessage.addMessage(req, res, next);
});
router.post('/getPic',function (req, res, next) {
    userMessage.getPic(req, res, next);
});



module.exports = router;
