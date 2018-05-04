import gulp from 'gulp'
import babelify from 'babelify'
import browserify from 'browserify'
import browserSync from 'browser-sync'
import source from 'vinyl-source-stream';

gulp.task("html", () => {
  return gulp.src("./app/*.html")
      .pipe(gulp.dest("./build"))
      .pipe(browserSync.stream());
});

gulp.task("libs", () => {
  return gulp.src("./app/libs/*.js")
      .pipe(gulp.dest("./build/libs"))
      .pipe(browserSync.stream());
});

gulp.task("css", () => {
  return gulp.src("./app/css/*.css")
      .pipe(gulp.dest("./build/css"))
      .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return browserify({
          entries: ["./app/js/main.js"]
      })
      .transform(babelify.configure({
          presets: ["es2015"]
      }))
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("./build/js"))
      .pipe(browserSync.stream());
});

gulp.task("startServer", () => {
  browserSync.init({
      server: "./build"
  });
});

gulp.task('watch', () => {
  gulp.watch('./app/*.html', ['html']);
  gulp.watch(['./app/js/**/*.js'], ['js']);
  gulp.watch(['./app/css/**/*.scss'], ['styles']);
});

gulp.task("build", ["html", "libs", "js", "css"]);
gulp.task("dev", ["build", "startServer", "watch"]);