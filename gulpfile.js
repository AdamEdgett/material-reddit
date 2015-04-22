var gulp = require('gulp');

var connect = require('gulp-connect');
var compass = require('gulp-compass');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

var paths = {
  sass: 'src/sass/**/*.scss',
  js: [ 'src/js/**/*.js', 'src/js/**/*.jsx' ]
};

gulp.task('js', function() {
  return browserify({
    entries: './src/js/app.js',
    paths: [ './node_modules', './public/vendor', './src/js' ]
  })
    .transform(babelify)
    .on('error', swallowError)
    .bundle()
    .on('error', swallowError)
    .pipe(source('./public/js/bundle.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('compass', function() {
  return gulp.src(paths.sass)
  .pipe(compass({
    css: 'public/css',
    sass: 'src/sass',
  }))
  .on('error', swallowError);
});

gulp.task('connect', function() {
  connect.server({
    root: 'public/',
    port: 1337
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['compass']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('build', ['compass', 'js']);
gulp.task('default', ['build', 'connect', 'watch']);
