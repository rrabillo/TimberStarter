var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var paths        = require('../config.js');

gulp.task('sass', function() {
    return gulp.src(paths.src + paths.css + '**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({
            browsers: [
                'ie >= 10',
                'Chrome >= 31',
                'Safari >= 7',
                'ff >= 38'
            ]
        }) ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist + paths.css));
});
