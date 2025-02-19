const {clone} = require("./behavior");
const {getTasks} = require("../service/getTaskManager");

module.exports = {
    task: (() => {
        const streams = (() => getTasks({keyn: 'clone', behavior: clone}).map(src => src.stream));

        return {
            streams
        };
    })()
};