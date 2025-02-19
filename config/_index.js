// added 'deploy (gulp)task' in Jenkins
const {task, series} = require("gulp");
const {access, constants: {F_OK}} = require("fs");
const {path: {dest: {clean: cleanDes}}} = require("../package.json");
const {task: clean} = require("./clean/_index");
const {task: clone} = require("./clone/_index");
const {task: compile} = require("./compile/_index");
const {task: minify} = require("./minify/_index");

module.exports = {
    tasks: (() => {
        task("clean", done => {
            done();
        
            return clean.streams().map(stream => stream().then(() => series("clone")()));
        });

        task("minify", done => {
            done();
        
            return minify.streams().map(stream => stream());
        });

        task("compile", series(done => {
            return Promise.all(compile.streams()).then(() => {
                done();
                series("minify")();
            }).catch(err => {
                console.error('Error in compile tasks:', err);
            });
        }));

        task("clone", series(done => {
            done();
            
            return clone.streams().map(stream => stream());
        }, "compile"));

        task("deploy", done => {
            access(cleanDes, F_OK, err => {
                (err) ? series("clone")() : series("clean")();
        
                done();
            });
        });
    })
};