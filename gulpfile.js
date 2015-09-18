var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    uglify = require('gulp-uglify'),
    bower = require('gulp-bower'),
    closureCompiler = require('gulp-closure-compiler'),
    fs = require('fs'),
    size = require('gulp-size'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace');


// compile sass
gulp.task('sass', function () {
    return sass('src/water.scss',{
        compass: true,
        style: 'compressed'
    })
    .pipe(rename("demo.css"))
    .pipe(gulp.dest('demo'));
});

// closure compiler
gulp.task('script', ['sass'], function() {
  return gulp.src('src/water.js')
    .pipe(closureCompiler({
        compilerPath: 'node_modules/google-closure-compiler/compiler.jar',
        fileName: 'demo.js',
        compilerFlags: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS',
            output_wrapper: '(function(){%output%}).call(window);',
            jscomp_off: 'checkVars',
            warning_level: 'VERBOSE'
        }
    }))
    .pipe(gulp.dest('demo'));
});

// build the demo
gulp.task('build', ['script'], function () {
    return gulp.src('src/water.html')
        .pipe(replace('%SCRIPT%', fs.readFileSync('demo/demo.js', 'utf8')))
        .pipe(replace('%STYLE%', fs.readFileSync('demo/demo.css', 'utf8')))
        .pipe(replace('\n', ''))
        .pipe(size({
            title: 'Demo size:',
            pretty: false
        }))
        .pipe(rename("demo.html"))
        .pipe(gulp.dest('demo'));
});


// watch files
gulp.task('watch', function() {
    gulp.watch('src/*.js', ['script', 'build']);
    gulp.watch('src/*.scss', ['sass', 'build']);
});


// Default Task
gulp.task('default', ['sass', 'script', 'watch', 'build']);