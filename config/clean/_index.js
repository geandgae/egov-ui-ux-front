const {clean} = require("./behavior");
const {getTasks} = require("../service/getTaskManager");

module.exports = {
    task: (() => {
        const streams = (() => getTasks({keyn: 'clean', behavior: clean}).map(src => src.stream));

        return {
            streams
        };
    })()
};