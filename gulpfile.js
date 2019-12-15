// require('./gulp/tasks/styles');
// require('./gulp/tasks/watch');

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const rename = require('gulp-rename');

gulp.task('sass', async function() {
	return gulp
		.src('src/assets/css/sass/*.scss ')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src/assets/css'))
		.pipe(browserSync.stream());
});

// Watch and Serve
gulp.task('serve', async function() {
	browserSync.init({
		server: './src'
	});
	watch('src/assets/css/**/*.scss', gulp.series('sass'));
	watch('src/*.html').on('change', browserSync.reload);
});

// Copy CSS Base Files
gulp.task('sassbootstrap', function() {
	return gulp
		.src('node_modules/bootstrap/dist/css/bootstrap.css')
		.pipe(gulp.dest('src/assets/css'));
});

// Copy Font's
gulp.task('fonts', function() {
	return gulp
		.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('src/assets/fonts'));
});

gulp.task('fa', function() {
	return gulp
		.src('node_modules/font-awesome/css/font-awesome.css')
		.pipe(gulp.dest('src/assets/css'));
});

gulp.task('renamesass', function() {
	return gulp
		.src('src/assets/css/bootstrap.css')
		.pipe(rename('_bootstrap.scss'))
		.pipe(gulp.dest('src/assets/css/sass/base'));
});

gulp.task('renamefa', function() {
	return gulp
		.src('src/assets/css/font-awesome.css')
		.pipe(rename('_font-awesome.scss'))
		.pipe(gulp.dest('src/assets/css/sass/base'));
});

// Copy JS Files
gulp.task('js', function() {
	return gulp
		.src([
			'node_modules/bootstrap/dist/js/bootstrap.min.js',
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/popper.js/dist/umd/popper.min.js'
		])
		.pipe(gulp.dest('src/assets/js'));
});

// Start
gulp.task(
	'start',
	gulp.series([
		'sassbootstrap',
		'fonts',
		'fa',
		'js',
		'renamesass',
		'renamefa',
		'sass'
	])
);
// Default
gulp.task('default', gulp.series('serve'));
