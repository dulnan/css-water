var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    uglify = require('gulp-uglify');
    bower = require('gulp-bower');


gulp.task('sass', function () {
    return sass('src/water.scss',{
        compass: true,
        style: 'compressed'
    })
        .pipe(gulp.dest('demo'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/water.js')
        .pipe(gulp.dest('demo'))
        .pipe(uglify())
        .pipe(gulp.dest('demo'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/*.js', ['scripts']);
    gulp.watch('src/*.scss', ['sass']);
});


// Default Task
gulp.task('default', ['sass', 'scripts', 'watch']);