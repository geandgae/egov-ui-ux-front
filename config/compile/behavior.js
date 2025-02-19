const {src, dest} = require("gulp");
const {init, write} = require("gulp-sourcemaps");
const sass = require("gulp-dart-sass");
const flatten = require("gulp-flatten");

const compile = params => {
    const {key, source, destination} = params;    

    return {
        key,
        stream: (() => {
            return new Promise((resolve, reject) => {
                src(source)
                    .pipe(init())
                    .pipe(sass().on('error', sass.logError))
                    .pipe(flatten())
                    .pipe(write('.'))
                    .pipe(dest(destination))
                    .on('end', resolve)
                    .on('error', reject);
            });
        })(),
        source
    };
}

module.exports = {
    compile
};