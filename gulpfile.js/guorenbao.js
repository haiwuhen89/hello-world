var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var useref = require('gulp-useref'); //
var gulpif = require('gulp-if');
var minifyCss = require('gulp-clean-css');


gulp.task('guorenbaoHTML',function(){
    gulp.src('./app/guorenbao0.0/*.html')
        //.pipe(concat('all.html'))
        .pipe(gulp.dest('./dist/app/guorenbao0.0'))
        .pipe(browserSync.stream());
});

gulp.task('guorenbaoCSS',function(){
    gulp.src('./app/guorenbao0.0/css/*.css')
        // .pipe(concat('index.css'))
        .pipe(gulp.dest('./dist/app/guorenbao0.0/css'))
        .pipe(browserSync.stream());
});

gulp.task('guorenbaoJS',function(){
    gulp.src('./app/guorenbao0.0/js/*.js')
        //.pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/app/guorenbao0.0/js'))
        .pipe(browserSync.stream());
});

gulp.task('guorenbao',function(){
    browserSync.init({ 
        server: { 
            baseDir:["./dist/app/guorenbao0.0"], 
            middleware:SSI({ 
                baseDir:'./dist', 
                ext:'.shtml', 
                version:'2.10.0' 
            }) 
        } 
    }); 
    gulp.watch("app/guorenbao0.0/css/*.css", ['guorenbaoCSS']); 
    gulp.watch("app/guorenbao0.0/js/*.js", ['guorenbaoJS']); 
    gulp.watch("app/guorenbao0.0/*.html", ['guorenbaoHTML']); 
    gulp.watch("dist/app/guorenbao0.0/*.html").on("change",browserSync.reload);
});

gulp.task('html', function () {
    // gulp.run('guorenbaoCSS');
    return gulp.src('app/guorenbao0.0/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist/app/guorenbao0.0'));
});