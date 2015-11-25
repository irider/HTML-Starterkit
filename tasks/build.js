// var gulp = require('gulp');

// Optimize images
gulp.task('optimize-images', function() {
    gulp.src('app/assets/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('build/assets/images'))
        .pipe($.size({
            title: 'images'
        }))
});

// Compile and prefix styles
gulp.task('build-styles', function() {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 8',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];


    return gulp.src([
            'app/assets/sass/**/*.scss',
            'app/assets/styles/**/*.css'
        ])
        .pipe($.newer('.tmp/styles'))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        // Concatenate and minify styles
        // .pipe($.if('*.css', $.minifyCss()))
        .pipe($.size({
            title: 'styles'
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('build/assets/styles'));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enables ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('build-scripts', function() {
    gulp.src([
            // Note: Since we are not using useref in the scripts build pipeline,
            //       you need to explicitly list your scripts here in the right order
            //       to be correctly concatenated
            'app/assets/scripts/main.js'
            // Other scripts
        ])
        .pipe($.newer('.tmp/scripts'))
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe($.concat('main.min.js'))
        .pipe($.uglify({
            preserveComments: 'some'
        }))
        // Output files
        .pipe($.size({
            title: 'scripts'
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('build/assets/scripts'))
});


