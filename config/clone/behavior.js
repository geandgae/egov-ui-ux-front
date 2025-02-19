const {src, dest} = require("gulp");

const clone = params => {
    const {key, source, destination} = params;
    const _destination = destination.includes('*') ? destination.split('*')[0] : destination;

    return {
        key,
        stream: (() => src(source).pipe(dest(_destination))),
        source
    };
}

module.exports = {
    clone
};