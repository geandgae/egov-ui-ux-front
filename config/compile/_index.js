const {compile} = require("./behavior");
const {getTasks} = require("../service/getTaskManager");

module.exports = {
    task: (() => {
        const streams = (() => getTasks({keyn: 'compile', behavior: compile}).map(src => src.stream));

        return {
            streams
        };
    })()
};