const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

const buildHTML = () => gulp.src('src/**/*.html').pipe(gulp.dest('build'));

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
    .src(['src/img/**/*'])
    .pipe(imagemin({ interlaced: true }))
    .pipe(gulp.dest('build/img'));

const build = gulp.parallel(buildHTML, buildCSS, buildJS, buildImg);

const watch = () => {
  gulp.watch(['src/**/*.html'], buildHTML);
  gulp.watch(['src/scss/**/*'], buildCSS);
  gulp.watch(['src/js/**/*'], buildJS);
  gulp.watch(['src/img/**/*'], buildImg);
};

exports.build = build;
exports.watch = watch;
exports.default = build;
