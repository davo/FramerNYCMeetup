
var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename    = require('gulp-rename'),
    plumber   = require('gulp-plumber'),
    webserver = require('gulp-webserver'),
    opn       = require('opn');

var tinylr;

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

var server = {
  host: 'localhost',
  port: '8005'
}

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('styles', function() {
      return gulp.src('assets/css/*.scss')
        .pipe(sass({ includePaths : ['_/scss/'] }))
        .pipe(plumber())
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest('assets/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('webserver', function() {
  gulp.src( './' )
    .pipe(webserver({
      fallback:         'index.html',
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('watch', function() {
  gulp.watch('assets/css/*.scss', ['styles']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('assets/css/*.css', notifyLiveReload);
});

gulp.task('default', ['styles', 'livereload', 'watch', 'webserver', 'openbrowser'], function() {

});
