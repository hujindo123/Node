'use strict';

var gulp = require('gulp');

var sass = require('gulp-ruby-sass');
/* px 转rem */
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
/* 图片合并精灵 */
var spritesmith = require('gulp.spritesmith');
/* 图片压缩 */
var imagemin = require('gulp-imagemin');
/* 压缩图片类型 */
var imageminGifsicle = require('imagemin-gifsicle');
var imageminOptipng = require('imagemin-optipng');
var imageminJpegtran = require('imagemin-jpegtran');
/* 默认添加css3前缀 */
var autoprefixer = require('gulp-autoprefixer'); //添加css前缀
//css压缩
var cssnano = require('gulp-cssnano');
/* 重命名*/
var rename = require('gulp-rename');
//过滤
var filter = require('gulp-filter');
/* 缓存当前文件 只让修改的文件通过管道 */
var cached = require('gulp-cached');
/* 保存并自动刷新  */
var browserSync = require('browser-sync');
/* 启动web服务 */
var connect = require('gulp-connect');
/* 启动web服务 */
var nodemon = require('gulp-nodemon');
/* 自动刷新 */
var livereload = require('gulp-livereload');
/* 根目录 */
const dirname = __dirname + '/public';
//dev task start
//DONE can not compile the sass or less file

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'bin/www'
    }).on('start', function () {
        if (!called) {
            cb();
            called = true;
        }
    });
});
gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init
    (null, {
        proxy: 'http://localhost:18080',
        files: ['public/**/*.*', 'views/**/*.*'],
        browser: 'chrome',
        notify: false,
        port: 7000
    });
});
//sass
gulp.task('sass', function () {
    return sass(dirname + '/sass/test.scss', {style: 'expanded'})  // 传入 sass 目录及子目录下的所有 .scss 文件生成文件流通过管道并设置输出格式
    /* .pipe(cached('sass'))  // 缓存传入文件，只让已修改的文件通过管道（第一次执行是全部通过，因为还没有记录缓存）
     .pipe(autoprefixer('last 6 version')) // 添加 CSS 浏览器前缀，兼容最新的5个版本
     .pipe(gulp.dest('dist/css')) // 输出到 dist/css 目录下（不影响此时管道里的文件流）
     .pipe(rename({suffix: '.min'})) // 对管道里的文件流添加 .min 的重命名
     .pipe(cssnano()) // 压缩 CSS*/
        .pipe(gulp.dest(dirname + '/dist/css')) // 输出到 dist/css 目录下，此时每个文件都有压缩（*.min.css）和未压缩(*.css)两个版本
});
//rem
gulp.task('rem', function () {
    var processors = [px2rem({remUnit: 75})];
    return gulp.src(dirname + '/sass/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest(dirname + '/dist/css'))
        .pipe(livereload());
});
//图片合并
gulp.task('spritesmith', function () {
    gulp.src(dirname + '/images/music/icon/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        })).pipe(gulp.dest(dirname + '/images/music/icon'));
});
//压缩图片
gulp.task('imagemin', function () {
    gulp.src(dirname + '/images/music/icon/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            multipass: true,
            use: [imageminGifsicle(), imageminOptipng(), imageminJpegtran()]
        })).pipe(gulp.dest(dirname + '/images/music/icon'));
});
// css前缀
gulp.task('css', function () {
    gulp.src(dirname + '/dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 5 version', 'Android>=4.0'],//定义使用的浏览器版本
            cascade: true,//是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //transform: rotate(45deg);
            remove: true ////是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(dirname + '/stylesheets/music'));
});
/* css 压缩 */
gulp.task('cssnano', function () {
    gulp.src(dirname + '/stylesheets/music/*.css')
        .pipe(filter(['**/*', '!**/*.min.css']))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(dirname + '/stylesheets/music'));
});
/* styleReload(结合watch任务，无刷新注入 )*/
gulp.task('styleReload', ['rem', 'css'], function () {
    return gulp.src([dirname + '/dist/css/*.css'])
    /*   .pipe(cached('style'))*/
        .pipe(browserSync.reload({stream: true}));
        // 使用无刷新 browserSync 注入 CSS
});
/*重命名*/
gulp.task('rename', function () {
    gulp.src(dirname + '/dist/*.css')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(dirname + '/dist'))
});
//DONE add build task
gulp.task('ejs', function () {
    return gulp.src(['./views/**/*.ejs'])
        .pipe(livereload());
});
//build task end

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['public/sass/**/*.css'], ['rem']);
    gulp.watch(['./views/**/*.ejs'], ['ejs']);

});