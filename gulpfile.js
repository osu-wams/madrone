'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');


function buildStyles() {
    return gulp.src('./src/madrone.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
}

function copyBSScripts() {
    return gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.js.map'
    ])
        .pipe(gulp.dest('dist/'));
}

function buildScripts() {
    return gulp.src('./src/madrone.js')
        .pipe(gulp.dest('dist/'))
}

function watchFiles() {
    gulp.watch('./src/**/*.scss', gulp.series(buildStyles));
    gulp.watch('./src/**/*.js', gulp.series(buildScripts));
}

exports.buildStyles = buildStyles;
exports.copyBSScripts = copyBSScripts;
exports.buildScripts = buildScripts;
exports.watch = gulp.series(buildStyles, copyBSScripts, buildScripts, watchFiles);
exports.default = gulp.series(buildStyles, copyBSScripts, buildScripts);
