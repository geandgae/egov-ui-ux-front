const {src, dest} = require("gulp");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const compression = (() => {
    return {
        js: require("gulp-uglify"),
        css: require("gulp-clean-css")
    }
})();

const minify = params => {
    const {key, source, destination, namespace: {file, path: {from, to}}} = params;
    const _source = source.map(s => {
        return `${s}.${key}`;
    });

    return {
        key,
        stream: (() => {
            const extname = `${file}.${key}`;

            return src(_source)
                .pipe(rename({extname}))
                .pipe(compression[key]())
                .pipe(concat(extname))
                .pipe(replace(from, to))
                .pipe(dest(destination));                
        }),
        source
    };
}

module.exports = {
    minify
};