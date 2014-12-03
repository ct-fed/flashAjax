var gulp = require('gulp')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

gulp.task('server', function() {
    connect.server();
});

var srcPath = "./src";
var buildPath = "./build";
var srcJs = [srcPath + '/swfobject.js', srcPath + '/flashAjax.js'];
var srcXml = [srcPath + '/crossdomain.xml'];
var srcSwf = [srcPath + '/crossdomain.swf'];

gulp.task('buildJs', function() {
    gulp.src(srcJs)
        .pipe(concat('flashAjax.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath))
});
gulp.task('buildXml', function() {
    gulp.src(srcXml)
        .pipe(gulp.dest(buildPath))
});

gulp.task('buildSwf', function() {
    gulp.src(srcSwf)
        .pipe(gulp.dest(buildPath))
});

gulp.task('watch', function() {
    gulp.watch(srcJs, ['buildJs']);
    gulp.watch(srcXml, ['buildXml']);
    gulp.watch(srcSwf, ['buildSwf']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'buildXml', 'buildSwf', 'buildJs', 'server']);