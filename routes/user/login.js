var express = require('express');
var router = express.Router();
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
router.post('/user/login', function(req, res, next) {
  console.log(111)
});




module.exports = router;
