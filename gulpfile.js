'use strict';

require('../../gulp/gulp-init.js')();

const comb = require('../../gulp/tasks/comb.js'),
        {scss, scssMin, scssDev} = require('../../gulp/tasks/scss.js'),
        mincss   = require('../../gulp/tasks/mincss.js'),
        uglifyes = require('../../gulp/tasks/uglify.js').uglifyes,
        { sync, syncInit } = require('../../gulp/tasks/sync.js');

function watchFiles () {
    syncInit();
    watch($.path.scss.files, series(scss));
    watch([$.path.js.files, '!' + $.path.js.filesMin], series(uglifyes, sync));
    watch($.path.html.files, sync);
}

task('combScss', comb);
task('uglifyEs6', uglifyes);
task('sass2minCss', scssMin);
task('devMap', scssDev);
task('watch', watchFiles);