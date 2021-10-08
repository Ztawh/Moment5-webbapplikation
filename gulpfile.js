// Hämtar paket
const {src, dest, watch, series, parallel} = require("gulp");
const terser = require("gulp-terser").default;
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");


// Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    sassPath: "src/**/*.scss",
    tsPath: "src/**/*.ts"
};

//HTML-task, kopierar filer
function copyHTML() {
    return src(files.htmlPath).pipe(dest("pub"));
};

// TS till JS. Samt minimerar och transpilerar
function jsTask() {
    return src(files.tsPath)
    .pipe(tsProject())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(terser())
    .pipe(dest("pub/js"));
};


//Scss-task.
function sassTask(){
    return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest("pub"))
    .pipe(browserSync.stream());
};

//Watch-task
function watchTask(){
    browserSync.init({
        server: "./pub"
    });
    return watch([files.htmlPath, files.tsPath, files.sassPath], parallel(copyHTML, jsTask, sassTask)).on("change", browserSync.reload);
};

// Kör samtliga funktioner vid start av gulp. 
exports.default = series (
    parallel(copyHTML, jsTask, sassTask),
    watchTask
);
