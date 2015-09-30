// load plugins
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var browserSync = require('browser-sync').create();

var conf = {
	styleSrc: './kumamon/src/',
	styleDist: './kumamon/dist/',
	serverRoot: './kumamon/'
};

// css and images revision
gulp.task('styles', function() {
	return plugins.rubySass(conf.styleSrc, {style: 'expanded'})
		.on('error', function (err) {
			console.log('Error!', err.message);
		})
		.pipe(plugins.autoprefixer({
			browsers: ['> 1%', 'last 10 version'],
			cascade: true
		}))
		.pipe(gulp.dest(conf.styleDist))
		.pipe(browserSync.stream());
		//.pipe(plugins.notify('CSS task completed!'));
});

// static server + watching
gulp.task('serve', function () {
	browserSync.init({
		server: conf.serverRoot
	});
	gulp.watch(conf.serverRoot + 'src/**/*.scss', ['styles']);

	gulp.watch(conf.serverRoot + '**/*.html').on('change', browserSync.reload);
});

// clean
gulp.task('clean', function() {
	return gulp.src(['./dist/styles/', './dist/scripts/', './dist/images/', './dist/**/*.html', './rev/'], {read: false})
		.pipe(plugins.clean());
});