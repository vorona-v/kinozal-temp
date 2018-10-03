'use strict';
 
var gulp             = require('gulp');
var sass             = require('gulp-sass');
var autoprefixer     = require('gulp-autoprefixer');
var gcmq             = require('gulp-group-css-media-queries');
var sourcemaps       = require('gulp-sourcemaps');
var notify           = require('gulp-notify');
var browserSync      = require('browser-sync');
var smartgrid        = require('smart-grid');
var csscomb          = require('gulp-csscomb');
var gcmq             = require('gulp-group-css-media-queries');
var runSequence      = require('run-sequence');
var changed          = require('gulp-changed');


const path = {
  scssInputFolder: './assets/scss/',
  scssInputFiles:  './assets/scss/**/*.scss',
  scssTempFolder:  './temp/scss/',
  scssTempFiles:   './temp/scss/**/*.scss',
  cssOutputFolder: './assets/css/',
  cssOutputFiles:  './assets/css/**/*.css',
  jsOutputFiles:   './assets/js/**/*.js',
  phpOutputFiles:  './theme/**/*.php',
  distFolder:      './dist/',
  tempFolder:      './temp/',
  uploadFolder:    './upload/'
};


gulp.task('comb', function () {
  return gulp.src([path.scssInputFiles, '!' + path.scssInputFolder + '**/_smart-grid.scss'])
    .pipe(csscomb('.csscomb.json').on("error", notify.onError(function (error) {
      return "File: " + error.message;
    })))
    .pipe(gulp.dest(path.scssInputFolder));
});


gulp.task('sass', function () {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError(function (error) {
        return "File: " + error.message;
      })))
    .pipe(gcmq())
    .pipe(autoprefixer({
            browsers: ['last 5 versions', '> 1%'],
            cascade: true
        }))
    .pipe(notify({
      message: 'Compiled!',
      sound: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('compile', function (callback) {
  runSequence('comb', 'sass', callback);
});


gulp.task('browser-sync', function () {
      browserSync({
            server: {
                baseDir: './'
            },
            notify: false
      })
});


gulp.task('watch', ['browser-sync', 'compile'], function () {
      gulp.watch('./assets/scss/**/*.scss', ['compile']);
      gulp.watch('./*.html', browserSync.reload);
      gulp.watch('./assets/**/*.js', browserSync.reload);
      gulp.watch('./assets/*.css', browserSync.reload);
});
