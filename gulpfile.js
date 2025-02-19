"use strict";

// plug-in
const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const sourcemaps = require("gulp-sourcemaps");
const fs = require("fs-extra");
const browserSync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const htmlbeautify = require("gulp-html-beautify");
// const uglify = require("gulp-uglify");
// const rename = require("gulp-rename");
// const flatten = require("gulp-flatten");
// const cleanCSS = require("gulp-clean-css");

// path
const pathSrc = {
  root: "./",
  css: "./resources/css",
  scss: "./resources/scss/**/*.scss",
  js: "./resources/js/**/*.js",
  html: "./html/**/*.html",
};
const pathDist = {
  root: "./dist",
  css: "./dist/resources/css",
  js: "./dist/resources/js",
  html: "./dist/html"
};

// clean
gulp.task("clean", () => {
  return import("del").then((del) => {
    return del.deleteAsync([
      `${pathDist.root}`,
      `${pathSrc.css}/**`,
      `!${pathSrc.css}/token/`,
      `!${pathSrc.css}/token/**`,
      `!${pathSrc.css}/plugin/`,
      `!${pathSrc.css}/plugin/**`,
      `!${pathSrc.css}/code/`,
      `!${pathSrc.css}/code/**`
    ]);
  });
});

// sass
gulp.task("sass", () => {
  return gulp.src(pathSrc.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", function(err) {
      // 오류 발생 시 프로세스 종료
      console.error(err.message);
      process.exit(1); 
    }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(pathSrc.css))
    .pipe(browserSync.stream());
    // min
    // .on("end", function() {
    //   return gulp.src("./resources/css/**/*.css")
    //     .pipe(rename({ suffix: ".min" }))
    //     .pipe(cleanCSS())
    //     .pipe(gulp.dest(pathDist.css));
    // });
});

// css copy
gulp.task("css", () => {
  return gulp.src("./resources/css/**/*")
    .pipe(gulp.dest(pathDist.css))
    .pipe(browserSync.stream());
});

// JavaScript
gulp.task("scripts", () => {
  return gulp.src(pathSrc.js)
    .pipe(gulp.dest(pathDist.js))
    // .pipe(rename({ suffix: ".min" }))
    // .pipe(uglify())
    // .pipe(gulp.dest(pathDist.js))
    .pipe(browserSync.stream());
});

// html copy
gulp.task("html", () => {
  const options = {
    indent_size: 2, 
    preserve_newlines: true,
    max_preserve_newlines: 1,
    wrap_line_length: 200
  };

  return gulp.src([pathSrc.html, "!./html/**/inc/*.html"])
    .pipe(fileinclude({
      prefix: "@@",
      basepath: "@file",
      context: {
        html: "/html"
      }
    }))
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest(pathDist.html))
    .pipe(browserSync.stream());
});

// assets copy
gulp.task("assets", () => {
  return Promise.all([
	fs.copy("./public/", "./dist"),	
    fs.copy("./resources/fonts", "./dist/resources/fonts"),
    fs.copy("./resources/img", "./dist/resources/img"),
    fs.copy("./resources/file", "./dist/resources/file"),
    fs.copy("./resources/video", "./dist/resources/video"),
  ]);
});

// server
gulp.task("server", () => {
  browserSync.init({
    server: {
      baseDir: pathDist.root
    },
    startPath: "/html/site/index.html",
    logFileChanges: false,
    ghostMode: false,
  });
  // watch
  gulp.watch(pathSrc.scss, gulp.series("sass", "css"));
  gulp.watch(pathSrc.js, gulp.series("scripts"));
  gulp.watch(pathSrc.html, gulp.series("html"));
  // gulp.watch(pathSrc.root + "/**/*").on("change", browserSync.reload);
});

// gulp start
gulp.task("default", gulp.series("clean", "sass", "css", "scripts", "html", "assets", "server"));
gulp.task("dist", gulp.series("clean", "sass", "css", "scripts", "html", "assets",));



// added 'deploy (gulp)task' in Jenkins
const {tasks: deploy} = require("./config/_index");
deploy();