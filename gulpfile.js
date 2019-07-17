var browserSync = require("browser-sync");
var del = require("del");
var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var cssnano = require("gulp-cssnano");
var sass = require("gulp-sass");
var sassGlob = require('gulp-sass-glob');
var uglify = require("gulp-uglify");
var connect = require('gulp-connect-php');

gulp.task("serve", function () {
  connect.server({}, function () {
    browserSync({
      proxy: '127.0.0.1:8000'
    });
  });
});

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
});

// JS related Tasks

gulp.task("es", function () {
  return gulp
    .src(["assets/es/**/*.js"])
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(gulp.dest("assets/js"));
});

gulp.task("cleanjs", function () {
  return del(["assets/js/all.min.js"]);
});

gulp.task("scripts", gulp.series('cleanjs', 'es', function () {
  return gulp
    .src([
      "assets/js/*.js"
    ])
    .pipe(concat("all.min.js", {
      newLine: "\n;"
    }))
    .pipe(gulp.dest("assets/js"))
    .pipe(browserSync.reload({
      stream: true
    }));
}));

// CSS related tasks

gulp.task("cleancss", function () {
  return del(["assets/css/all.min.css"]);
});

gulp.task("sass", function () {
  return gulp
    .src("assets/scss/main.scss")
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("assets/css"));
});

gulp.task("css", gulp.series('cleancss', 'sass', function () {
  return gulp
    .src(["assets/css/!(main)*.css", "assets/css/main.css"])
    .pipe(concat("all.min.css"))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
}));

// Open up the server


gulp.task('watch', function () {
  gulp.watch("assets/scss/**/*.scss", gulp.series("css"));
  gulp.watch(["assets/js/!main*.js", "assets/es/**/*.js"], gulp.series('scripts'));
  gulp.watch(['**/*.php', '*.css', '*.html']).on('change', function () {
    browserSync.reload();
  });
})

gulp.task('default', gulp.parallel('serve', 'watch'));

// Dist version of project

gulp.task("clean", function () {
  return del(["dist/**/*"]);
});

gulp.task("move", function () {
  return gulp
    .src("*.+(png|xml|php|html|ico|jpg|svg|webmanifest|htaccess)")
    .pipe(gulp.dest("dist/"));
});

gulp.task("movecss", function () {
  return gulp
    .src(["assets/css/all.min.css"])
    .pipe(gulp.dest("dist/assets/css"));
});

gulp.task("movecsslibs", function () {
  return gulp
    .src(["assets/css/lib/**/*.css"])
    .pipe(gulp.dest("dist/assets/css"));
});

gulp.task("movejs", function () {
  return gulp
    .src(["assets/js/all.min.js"])
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js"));
});

gulp.task("movejslibs", function () {
  return gulp.src(["assets/js/lib/**/*.js"]).pipe(gulp.dest("dist/assets/js"));
});

gulp.task("images", function () {
  return gulp
    .src("assets/images/**/*")
    .pipe(gulp.dest("dist/assets/images"));
});

gulp.task("moveinc", function () {
  return gulp.src(["inc/**/*.php"]).pipe(gulp.dest("dist/inc"));
});

gulp.task("movemodules", function () {
  return gulp.src(["modules/**/*.php"]).pipe(gulp.dest("dist/modules"));
});

gulp.task("movetemplates", function () {
  return gulp.src(["templates/**/*.php"]).pipe(gulp.dest("dist/templates"));
});

gulp.task("moveuploads", function () {
  return gulp.src(["uploads/**/*"]).pipe(gulp.dest("dist/uploads"));
});

gulp.task("movewebfonts", function () {
  return gulp
    .src(["assets/webfonts/**/*"])
    .pipe(gulp.dest("dist/assets/webfonts"));
});

gulp.task('build', gulp.series('clean', gulp.parallel("move", "movecss", "movecsslibs", "movejs", "movejslibs", "moveinc", "movemodules", "movetemplates", "moveuploads", "movewebfonts", "images")));