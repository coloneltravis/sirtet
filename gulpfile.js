var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');


gulp.task('default', function() {
  // place code for your default task here
});


gulp.task('build', function() {

    return gulp.src('js/**/*.js')
        .pipe(concat('sirtet.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('sirtet.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});



gulp.task('html', function() {

    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('css', function() {

    return gulp.src('css/*.css')
        .pipe(gulp.dest('dist/css'));
});


gulp.task('config', function() {

    return gulp.src('web.config')
        .pipe(gulp.dest('dist'));
});


gulp.task('minify', function(cb) {

        pump([
            gulp.src('js/**/*.js'),
            concat('sirtet.js'),
            uglify(),
            gulp.dest('dist/js')
        ], cb);
});

