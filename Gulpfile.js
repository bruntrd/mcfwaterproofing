var gulp = require('gulp');
var uglify = require('gulp-uglify');

var path = {
    assets: "server/public/assets/",
    vendors: "server/public/vendors/"
};

var vendorSources = [
    "node_modules/angular/angular.min.js",
    "node_modules/angular/angular.js",
    "node_modules/angular/angular.min.js.map",
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/jquery/dist/jquery.min.js.map",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/angular-route/angular-route.min.js",
    "node_modules/angular-route/angular-route.min.js.map",



];

var assetSources = [
    "client/styles/**/*",
    "client/views/**/*"
];

gulp.task('scripts', function() {
    return gulp.src('client/scripts/**/*')
    //.pipe(uglify())
        .pipe(gulp.dest("server/public/assets/scripts"))
});

gulp.task('assets', function() {
    return gulp.src(assetSources, {base: "client/"})
        .pipe(gulp.dest(path.assets))
});

gulp.task('vendors', function() {
    return gulp.src(vendorSources, {base: "node_modules/"})
        .pipe(gulp.dest(path.vendors));
});

gulp.task('watch', function() {
    gulp.watch('client/scripts/**/*', ['scripts']);
    gulp.watch(['client/styles/**/*', 'client/views/**/*'], ['assets']);
});

gulp.task('default', ['assets', 'vendors','scripts', 'watch']);