const {minify} = require("./behavior");
const {getTasks} = require("../service/getTaskManager");

module.exports = {
    task: (() => {
        const streams = (() => getTasks({keyn: 'minify', behavior: minify}).map(src => src.stream));

        return {
            streams
        };
    })()
};