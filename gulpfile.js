// Hämtar paket
const {src, dest, watch, series, parallel} = require("gulp");
const terser = require("gulp-terser").default;
const imagemin = require("gulp-imagemin");
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
    imgPath: "src/images/*",
    sassPath: "src/**/*.scss",
    tsPath: "src/**/*.ts"
};

//HTML-task, kopierar filer
function copyHTML() {
    return src(files.htmlPath).pipe(dest("pub"));
};

// //JS-task. Transpilerar, minifierar
// function jsTask() {
//     return src(files.jsPath)
//     .pipe(babel({
//         presets: ['@babel/env']
//     }))
//     .pipe(terser())
//     .pipe(dest("pub/js"));
// };

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

//Image-task. 
function imgTask(){
    return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest("pub/images"));
};

//Watch-task
function watchTask(){
    browserSync.init({
        server: "./pub"
    });
    return watch([files.htmlPath, files.tsPath, files.imgPath, files.sassPath], parallel(copyHTML, jsTask, imgTask, sassTask)).on("change", browserSync.reload);
};

// Kör samtliga funktioner vid start av gulp. 
exports.default = series (
    parallel(copyHTML, jsTask, imgTask, sassTask),
    watchTask
);
