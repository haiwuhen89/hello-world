var gulp = require('gulp');

// 引入组件
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var useref = require('gulp-useref'); //
var gulpif = require('gulp-if');
var minifyCss = require('gulp-clean-css');
var cheerio = require('gulp-cheerio');
var browserSync = require('browser-sync').create();
var SSI = require('browsersync-ssi');

require('./guorenbao');

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件    scripts任务会合并 js/ 目录下得所有得js文件并输出到 dist/ 目录，然后gulp会重命名、压缩合并的文件，也输出到 dist/ 目录。
gulp.task('scripts', function() {
    gulp.src('./app/guorenbao0.0/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/app/guorenbao0.0'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/app/guorenbao0.0'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });
});


