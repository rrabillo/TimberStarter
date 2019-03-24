const gulp = require('gulp');
const paths = require('../config.js');
const imagemin = require('gulp-imagemin');

gulp.task('imagemin', () => {

    return gulp.src(paths.src + paths.images + '**/*')
            .pipe(imagemin())
            .pipe(gulp.dest(paths.dist + paths.images))

        && gulp.src(paths.src + paths.svgs + '**/*')
            .pipe(imagemin())
            .pipe(gulp.dest(paths.dist + paths.svgs))

});