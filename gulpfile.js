var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compact'
};
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

function swallowError (error) {
    console.log(error.toString());

    this.emit('end')
}
gulp.task('sass', function () {
    return gulp
        .src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        //.pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(''));
});


gulp.task('minJs', function() {
    return gulp
        .src('./src/js/*.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js'],
            noSource: true,
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('dist/js'))
});


gulp.task('watch', function() {
    // Watch the input folder for change,
    // and run `sass` task when something happens
    gulp.watch('./src/sass/**/*.scss', ['sass'])
    .on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp.watch('./src/js/*.js',['minJs']);
});