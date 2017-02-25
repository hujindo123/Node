/**
 * Created by Administrator on 2016/10/31.
 */
 var gulp = require('gulp');
 var spritesmith = require('gulp.spritesmith');
var images = [
    'public/images/1.jpg',
    'public/images/2.jpg',
    'public/images/3.jpg'
];
 gulp.task('default', function () {
   console.log(11111111)
 var spriteData = gulp.src(images).pipe(spritesmith({
     imgName: 'public/sprite.jpg',
     cssName: 'public/sprite.css'
 }));
     console.log(spriteData)
     return spriteData.pipe(gulp.dest('public/'));
 });