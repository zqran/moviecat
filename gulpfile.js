// gulp 自动化构建
var gulp = require('gulp')
// js压缩和混淆
var uglify = require('gulp-uglify')
// css压缩
var cssnano = require('gulp-cssnano')
// html压缩
var htmlmin = require('gulp-htmlmin')
// 文件合并
var concat = require('gulp-concat')
// 路径替换
// var useref = require('gulp-useref')
// 同步浏览器
var browserSync = require('browser-sync').create()

// gulp任务：js压缩和混淆
gulp.task('js', function() {
	// 拷贝js
	gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular-route/angular-route.min.js'])
		.pipe(gulp.dest('./dist/assets/js'));

	gulp.src('./app/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.reload({stream: true}))
});

// gulp任务：css压缩
gulp.task('css', function() {
	gulp.src('./app/**/*.css')
		.pipe(concat('all.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/assets/css/'))
		.pipe(browserSync.reload({stream: true}))
});


// gulp任务：html压缩（首页除外）
gulp.task('html', function() {
	
	gulp.src(['./app/**/*.html'])
		.pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.reload({stream: true}))
});

// gulp任务：图片处理
gulp.task('img', function() {
	gulp.src('./app/assets/img/*.*')
		.pipe(gulp.dest('./dist/assets/img'))
		.pipe(browserSync.reload({stream: true}))
});

// gulp任务：同步浏览器刷新
gulp.task('browser-sync', function() {
	browserSync.init({
		server: './dist'
	});
});

// gulp任务：监视文件变化
gulp.task('watch', ['browser-sync'], function() {
	
	gulp.watch('./app/assets/img/*.*', ['img'])
	gulp.watch('./app/**/*.html', ['html'])
	gulp.watch('./app/**/*.css', ['css'])
	gulp.watch('./app/**/*.js', ['js'])
});

// 默认任务
gulp.task('default', ['css', 'js', 'html', 'img', 'watch']);