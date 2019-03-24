var gulp   = require('gulp');
var paths  = require('../config.js');
var node_modules  = './node_modules';

gulp.task('copy-js', function () {
    return gulp.src(node_modules + '/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(paths.dist + paths.scripts + 'vendor/'));
});

gulp.task('copy', ['copy-js']);
