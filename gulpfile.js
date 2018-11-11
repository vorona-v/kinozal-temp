'use strict';

require('../../gulp/gulp-init.js')();

const comb = require('../../gulp/tasks/comb.js'),
    {scss, scssDev, scssMin}     = require('../../gulp/tasks/scss.js'),
    mincss   = require('../../gulp/tasks/mincss.js'),
    uglifyes = require('../../gulp/tasks/uglify.js').uglifyes,
    { sync, syncInit } = require('../../gulp/tasks/sync.js');

function watchFiles () {
  syncInit();
  watch($.path.scss.files, series(scssDev));
  watch([$.path.js.files, '!' + $.path.js.filesMin], series(uglifyes, sync));
  watch($.path.html.files, sync);
}

task('combScss', comb);
task('uglifyEs6', uglifyes);
task('sass2minCss', series(scss, mincss));
task('build', parallel(scss, uglifyes));
task('watch', watchFiles);