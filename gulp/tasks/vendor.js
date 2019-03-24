var gulp     = require('gulp');
var jsmin    = require('gulp-jsmin');
var paths    = require('../config.js');

gulp.task('vendor', function () {
    return gulp.src(paths.src + paths.scripts + paths.vendor + '/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest(paths.dist + paths.scripts + paths.vendor));
});
