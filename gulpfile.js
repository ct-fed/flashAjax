var gulp = require('gulp')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

var domain = {
    path : './test/domain',
    port : 8083
};
var domain2 = {
    path : './test/domain2',
    port : 8084
};

gulp.task('domain', function() {
    connect.server({
        root: domain.path,
        livereload: true,
        port : domain.port
    });
});
gulp.task('domain2', function() {
    connect.server({
        root: domain2.path,
        livereload: true,
        port : domain2.port
    });
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
        .pipe(gulp.dest(domain.path))
        .pipe(gulp.dest(buildPath))
        .pipe(connect.reload())
});
gulp.task('buildXml', function() {
    gulp.src(srcXml)
        .pipe(gulp.dest(buildPath))
        .pipe(gulp.dest(domain2.path))
        .pipe(connect.reload())
});

gulp.task('buildSwf', function() {
    gulp.src(srcSwf)
        .pipe(gulp.dest(buildPath))
        .pipe(gulp.dest(domain.path))
        .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(srcJs, ['buildJs']);
    gulp.watch(srcXml, ['buildXml']);
    gulp.watch(srcSwf, ['buildSwf']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'buildXml', 'buildSwf', 'buildJs', 'domain', 'domain2']);