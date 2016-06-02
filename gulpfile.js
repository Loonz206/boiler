var fs        = require('fs');
var path      = require('path');
var jshint    = require('gulp-jshint');
var stylish   = require('jshint-stylish');
var concat    = require('gulp-concat');
var useref     = require('gulp-useref');
var uglify    = require('gulp-uglify');
var imagemin  = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var notify    = require('gulp-notify');
var rename    = require('gulp-rename');
var cache     = require('gulp-cache');
var cssnano   = require('gulp-cssnano');
var minifycss = require('gulp-minify-css');
var less      = require('gulp-less');
var path      = require('path');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var reload = browserSync.reload;
var plumber   = require('gulp-plumber');
var gutil = require('gulp-util');
var filesize = require('gulp-filesize');
var beep = require('beepbeep');
var gulp      = require('gulp');
var Server = require('karma').Server;
var protractor = require('gulp-protractor').protractor;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;
var plugins   = require('gulp-load-plugins')(); // Load all gulp plugins
                                              // automatically and attach
                                              // them to the `plugins` object

var runSequence = require('run-sequence');    // Temporary solution until gulp 4
                                              // https://github.com/gulpjs/gulp/issues/355

var pkg  = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;

// Beep Error Messaging + Red Coloring FTW.
var onError = function (err) {
    beep([1000, 500, 1500]);
    gutil.log(gutil.colors.red(err));
};

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('archive:create_archive_dir', function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        'cwd': dirs.dist,
        'dot': true // include hidden files
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(dirs.dist, file);

        // `archiver.bulk` does not maintain the file
        // permissions, so we need to add files individually
        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath).mode
        });

    });

    archiver.pipe(output);
    archiver.finalize();

});

gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist
    ]).then(function () {
        done();
    });
});

gulp.task('copy', [
    'copy:.htaccess',
    'copy:index.html',
    'copy:jquery',
    'copy:license',
    'copy:main.css',
    'copy:misc',
    'copy:normalize'
]);

gulp.task('copy:.htaccess', function () {
    return gulp.src('node_modules/apache-server-configs/dist/.htaccess')
               .pipe(plugins.replace(/# ErrorDocument/g, 'ErrorDocument'))
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:index.html', function () {
    return gulp.src(dirs.src + '/index.html')
               .pipe(plugins.replace(/{{JQUERY_VERSION}}/g, pkg.devDependencies.jquery))
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:jquery', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
               .pipe(plugins.rename('jquery-' + pkg.devDependencies.jquery + '.min.js'))
               .pipe(gulp.dest(dirs.dist + '/js/vendor'));
});

gulp.task('copy:license', function () {
    return gulp.src('LICENSE.txt')
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:main.css', function () {

    var banner = '/*! HTML5 Boilerplate v' + pkg.version +
                    ' | ' + pkg.license.type + ' License' +
                    ' | ' + pkg.homepage + ' */\n\n';

    return gulp.src(dirs.src + '/css/main.css')
               .pipe(plugins.header(banner))
               .pipe(plugins.autoprefixer({
                   browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
                   cascade: false
               }))
               .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('copy:misc', function () {
    return gulp.src([

        // Copy all files
        dirs.src + '/**/*',

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        '!' + dirs.src + '/css/main.css',
        '!' + dirs.src + '/index.html'

    ], {

        // Include hidden files by default
        dot: true

    }).pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:normalize', function () {
    return gulp.src('node_modules/normalize.css/normalize.css')
               .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('lint:js', function () {
    return gulp.src([
        'gulpfile.js',
        dirs.src + '/js/*.js',
        dirs.test + '/*.js'
    ]).pipe(plugins.jscs())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
});

// ---------------------------------------------------------------------
// | Minor tasks                                                        |
// ---------------------------------------------------------------------

// Watch JS for changes and reload on changes
gulp.task('jshint', function () {
    return gulp.src([
        'src/app/app.js',
        'src/app/**/*.js'
    ])
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .pipe(plumber({errorHandler: onError}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(filesize())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(filesize())
    .pipe(browserSync.stream({stream:true}))
    .pipe(notify({ message: 'Jshint task complete'}))
    .on('error', gutil.log);
});

// Watch less files for changes and reload on changes
gulp.task('less', function () {
    return gulp.src('src/less/main.less')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(filesize())
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(filesize())
    .pipe(browserSync.stream({stream:true}))
    .pipe(notify({ message: 'Less task complete'}))
    .on('error', gutil.log);
});

// Watch images for changes and reload on changes
gulp.task('images', function () {
    return gulp.src('src/img/**/*')
    .pipe(plumber({errorHandler: onError}))
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream({stream:true}))
    .pipe(notify({ message: 'Image task complete'}));
});

gulp.task('compileJs', function () {
   //
});

// Watch html for changes and reload on changes
gulp.task('html', function (){
    return gulp.src('src/**/*.html')
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream({stream:true}))
    .pipe(notify({ message: 'Html task complete'}));
});

// watches the gulpfile as its running as well
gulp.slurped = false; //step 1

gulp.task('watch', function () {
    if(!gulp.slurped){ //step 2
        gulp.watch('src/img/**/*', ['images'], reload);
        gulp.watch('src/app/**/*.js', ['jshint'], reload);
        gulp.watch('src/less/*.less', ['less'], reload);
        gulp.watch('src/**/*.html', ['html'], reload);
        gulp.watch('src/**/*.html').on('change', reload);
        gulp.slurped = true; //step 3
    }
});

// Serve a site after running multiple tasks
gulp.task('serve', ['images', 'jshint', 'html', 'less'], function () {
     browserSync.init({
        server: {
            baseDir: "src/.",
            open: "local",
            browser: "google chrome",
            middleware: [historyApiFallback()]
        }
    });
});

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

// Test suites for integration tests using Karma/Jasmine running on .spec.js files
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('archive', function (done) {
    runSequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
    done);
});

gulp.task('build', function (done) {
    runSequence(
        ['clean', 'lint:js'],
        'copy',
    done);
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/.",
            open: "local",
            browser: "google chrome"
        }
    });
});

gulp.task('webdriver_update', webdriver_update);
gulp.task('webdriver_standalone', webdriver_standalone);

// Setting up the test task
gulp.task('protractor', ['webdriver_update'], function(cb) {
    gulp.src(['spec/e2e/**/*.spec.js']).pipe(protractor({
        configFile: 'spec/conf/conf.js',
    })).on('error', function(e) {
        console.log(e);
    }).on('end', cb);
});

gulp.task('smokeTests', function () {
    gulp.start('protractor');
});

// Default task.. why type more?
gulp.task('default', ['clean'], function(){
    gulp.start('serve','watch', reload);
});
