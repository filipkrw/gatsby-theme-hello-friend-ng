"use strict"

var gulp = require("gulp")
var sass = require("gulp-sass")
var sourcemaps = require("gulp-sourcemaps")

sass.compiler = require("node-sass")

gulp.task("scss", function () {
  return gulp
    .src("scss/default.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css/"))
})

gulp.task("scss:watch", function () {
  gulp.watch("scss/", gulp.series("scss"))
})
