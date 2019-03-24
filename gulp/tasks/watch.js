var gulp        = require('gulp');
var browserSync = require('browser-sync');
var paths       = require('../config.js');

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(paths.src + paths.scripts + 'main/**/*.js', ['browserify', browserSync.reload]);
    gulp.watch(paths.src + paths.css + '**/*.scss', ['sass', browserSync.reload]);
});
