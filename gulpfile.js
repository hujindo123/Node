/**
 * Created by Administrator on 2016/10/31.
 */
var gulp = require('gulp');

var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var imageminGifsicle = require('imagemin-gifsicle');
var imageminOptipng = require('imagemin-optipng');
var imageminJpegtran = require('imagemin-jpegtran');
var autoprefixer = require('gulp-autoprefixer'); //添加css前缀
var cssnano = require('gulp-cssnano');//css压缩
var rename = require('gulp-rename');
var filter = require('gulp-filter');
const dirname = __dirname+'/public';
//图片合并
gulp.task('spritesmith', function () {
    gulp.src(dirname + '/images/music/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        })).pipe(gulp.dest(dirname+'/dist'));
});
//压缩图片
gulp.task('imagemin', function () {
     gulp.src(dirname+'/dist/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            multipass: true,
            use: [imageminGifsicle(),imageminOptipng(),imageminJpegtran()]
        })).pipe(gulp.dest(dirname+'/dist'));
});
// css前缀
gulp.task('css',function () {
    gulp.src(dirname+'/dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 5 version', 'Android>=4.0'],//定义使用的浏览器版本
            cascade: true,//是否美化属性值 默认：true 像这样：
                        //-webkit-transform: rotate(45deg);
                        //transform: rotate(45deg);
            remove: true ////是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(dirname+'/stylesheets/music'));
});
/* css 压缩 */
gulp.task('cssnano', function () {
   gulp.src(dirname+'/stylesheets/music/*.css')
       .pipe(filter(['**/*', '!**/*.min.css']))
       .pipe(rename({
           suffix: '.min'
       }))
       .pipe(cssnano())
       .pipe(gulp.dest(dirname+'/stylesheets/music'));
});
/*重命名 */
gulp.task('rename', function () {
    gulp.src(dirname+'/dist/*.css')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(dirname+'/dist'))
})
// watch开启本地服务并监听
/*gulp.task('watch', function () {
    browserSync.init({
        server:{
            baseDir: dirname+'/dist'
        }
    });
    gulp.watch('');
})*/
gulp.task('default',['css','cssnano']);
