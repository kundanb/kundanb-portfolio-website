const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

const cleanBuild = () => del(['build/css', 'build/js', 'build/img']);

const buildCSS = () =>
  gulp
    .src('src/scss/**/*')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('build/css'));

const buildJS = () =>
  gulp
    .src('src/js/**/*')
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

const buildImg = () =>
  gulp
    .src('src/js/**/*')
    .pipe(imagemin({ interlaced: true }))
    .pipe(gulp.dest('build/img'));

const build = gulp.series(
  cleanBuild,
  gulp.parallel(buildCSS, buildJS, buildImg)
);

const watch = () => {
  gulp.watch(['src/**/*'], build);
};

exports.build = build;
exports.watch = watch;
exports.default = build;
