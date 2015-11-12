var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var fileinclude = require('gulp-file-include');
// var requireDir = require('require-dir');
// var tasks = requireDir('tasks');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var reload = browserSync.reload;

gulp.task('sass', function() {
  return sass('app/assets/scss/styles.scss')
    .pipe(gulp.dest('app/assets/styles'))
    .pipe(reload({ stream:true }));
});

gulp.task('fileinclude', function() {
  gulp.src(['app/assets/pages/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('clean-includes', function() {
  return gulp.src('app/includes')
    .pipe(vinylPaths(del))
});


// watch files for changes and reload
gulp.task('serve', ['sass', 'fileinclude'], function() {
  browserSync({
    server: {
      baseDir: 'app',
      directory: true,
      ghostMode: false,
      // Append '.xip.io' to the hostname. (eg: http://192.168.1.164.xip.io:3002)
      // xip: true
    },
    ui: {
        port: 1001
        // Use custom port for new project for avoiding problems
    },
    port: 1000
  });

  gulp.watch('app/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/assets/pages/**/*.html', ['fileinclude']);
  gulp.watch(['*.html', 'assets/styles/**/*.css', 'assets/scripts/**/*.js'], {cwd: 'app'}, reload);
  gulp.run('clean-includes');
});