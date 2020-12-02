"use strict";

// Cargar Plugins
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const order = require("gulp-order");
const newer = require("gulp-newer");

// Destinos IMG

var imgSrc = "./src/img/**/*";
var imgDest = "./dist/img";

// Cargar package.json para banner
const pkg = require("./package.json");
const { data } = require("jquery");

// Contenido del Banner CSS
const bannerCss = [
  "@import url('https://fonts.googleapis.com/css2?family=Krub:wght@400;500;700&family=Material+Icons&family=Playfair+Display:wght@400;700&display=swap');",
  "/*!\n",
  " * ProjectName - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
  " * Copyright 2020-" + new Date().getFullYear(),
  " <%= pkg.author %>\n",
  " */\n",
  "\n",
].join("");

// Contenido del Banner JS
const bannerJs = [
  "/*!\n",
  " * ProjectName - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
  " * Copyright 2020-" + new Date().getFullYear(),
  " <%= pkg.author %>\n",
  " */\n",
  "\n",
].join("");

// Limpiar Librería
function clean() {
  return del(["./src/js/lib/"]);
}

// Integrar dependencias externas de los módulos de Node a Librerías
function modules() {
  // Bootstrap JS
  var bootstrap = gulp
    .src("./node_modules/bootstrap/dist/js/**/*")
    .pipe(gulp.dest("./src/lib/bootstrap"));
  // jQuery Easing
  var jqueryEasing = gulp
    .src("./node_modules/jquery.easing/*.js")
    .pipe(gulp.dest("./src/lib/jquery-easing"));
  // Slick
  var slick = gulp
    .src("./node_modules/slick-carousel/slick/*")
    .pipe(gulp.dest("./src/lib/slick"));
  // JQuery Migrate
  var jmigrate = gulp
    .src("./node_modules/jquery-migrate/dist/*")
    .pipe(gulp.dest("./src/lib/jquery-migrate"));
  // jQuery
  var jquery = gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js",
    ])
    .pipe(gulp.dest("./src/lib/jquery"));
  // jquery-match-height
  var jquerymatchheight = gulp
    .src("./node_modules/jquery-match-height/dist/jquery.matchHeight-min.js")
    .pipe(gulp.dest("./src/lib/jquery-match-height"));
  return merge(
    bootstrap,
    jquery,
    jqueryEasing,
    jmigrate,
    slick,
    jquerymatchheight
  );
}

// Image task
function images() {
  return gulp
    .src(imgSrc)
    .pipe(newer(imgDest))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest))
    .pipe(notify({ message: "Tarea de imágenes completada con éxito 👌" }));
}

// CSS task
function css() {
  return gulp
    .src(["./src/scss/**/*.scss", "./src/lib/**/*.css"])
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: "./node_modules",
      })
    )
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      header(bannerCss, {
        pkg: pkg,
      })
    )
    .pipe(concat("style.css"))
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"))
    .pipe(
      notify({
        title: "Sass OK",
        message: "Yeah! Tarea de Sass completada con éxito 👌",
        onLast: true,
      })
    );
}

// JS task
function js() {
  return gulp
    .src([
      "./src/lib/jquery/jquery.min.js",
      "./src/lib/bootstrap/bootstrap.bundle.min.js",
      "./src/lib/jquery-easing/jquery.easing.min.js",
      "./src/lib/jquery-migrate/jquery-migrate.min.js",
      "./src/lib/jquery-match-height/jquery.matchHeight-min.js",
      "./src/lib/slick/slick.min.js",
      "./src/js/api.js",
      "./src/js/script.js"
    ])
    .pipe(concat("main.js"))
    .pipe(uglify({ output: { comments: "all" } }))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(header(bannerJs, { pkg: pkg }))
    .pipe(gulp.dest("./dist/js"))
    .pipe(
      notify({
        title: "Js OK",
        message: "Yeah! Tarea de Js completada con éxito 👌",
        onLast: true,
      })
    );
}

// Watch files
function watchFiles() {
  gulp.watch("./src/img/**/*", images);
  gulp.watch("./src/scss/**/*", css);
  gulp.watch("./src/js/**/*", js);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js, images));
const watch = gulp.series(build, gulp.parallel(watchFiles));

// Export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
