var gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssvars = require("postcss-simple-vars"),
    nested = require("postcss-nested"),
    cssImport = require("postcss-import"),
    mixins = require("postcss-mixins"),
    watch = require("gulp-watch"),
    browserSync = require("browser-sync").create(),
    webpack = require("webpack"),
    imagemin = require("gulp-imagemin"), //Comparesses images
    del = require("del"), //Deletes folders
    usemin = require("gulp-usemin"), //Overarching compression package
    rev = require("gulp-rev"), //Helps revision files
    cssnano = require("gulp-cssnano"), //Compresses CSS
    uglify = require("gulp-uglify"); //Compresses JS

gulp.task("default", ["watch"]);

gulp.task("watch", ["styles"], () => {
    browserSync.init({
        server: "./app"
    });

    gulp.watch("./app/assets/styles/**/*.css", ["styles"]);
    gulp.watch("./app/assets/scripts/**/*.js", () => {
        gulp.start("scriptsRefresh");
    });
    gulp.watch("./app/*.html").on("change", browserSync.reload);
});

gulp.task("scripts", (callback) => {
    webpack(require("./webpack.config.js"), (err, stats) => {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});

gulp.task("styles", () => {
    return gulp.src("./app/assets/styles/styles.css")
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest("./app/temp/styles"))
        .pipe(browserSync.stream());
});

gulp.task("scriptsRefresh", ["scripts"], () => {
    browserSync.reload();
});

gulp.task("deleteDistFolder", () => {
    return del("./docs");
});

gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], () => {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [() =>  rev(), () =>  cssnano()],
            js: [() => rev(), () => uglify()]
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
    const pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"));
});

gulp.task("optimizeImages", ['deleteDistFolder'], () => {
    return gulp.src("./app/assets/images/**/*")
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./dist/assets/images"));
});

gulp.task("build", ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);

gulp.task("previewDist", () => {
    browserSync.init({
        server: "./docs"
    });
})