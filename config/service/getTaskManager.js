const {namespace: ns, dir, path: {src: {root: srcRoot, ...src}, dest: {root: destRoot, ...dest}}} = require("../../package.json");

const getTasks = (params => {
    const {keyn, behavior} = params;
    const namespace = ns?.[keyn];
    const _tasks = [];

    if(src?.[keyn]?.branch){
        const {root: branchRoot, branch} = src[keyn];        

        Object.entries(branch).forEach(([k, v]) => {
            if(dir?.[keyn]?.[k]){
                _tasks.push(...dir[keyn][k].map(dir => {
                    const source = [`${srcRoot}${branchRoot}${v}${dir}*`];
                    const destination = `${destRoot}${dest[keyn][k]}${dir}`;

                    return behavior({key: k, source, destination, namespace});
                }));
            }else{
                const source = [`${srcRoot}${branchRoot}${v}*`];
                const destination = `${destRoot}${dest[keyn][k]}`;

                _tasks.push(behavior({key: k, source, destination, namespace}));
            }
        });
    }else{
        if(src[keyn]){
            Object.entries(src[keyn]).forEach(([key, value]) => {
                if(!dir[keyn][key] || !(Boolean(dir[keyn]?.[key]?.length))){
                    if(value?.branch){
                        const {root: branchRoot, branch} = value;
        
                        Object.entries(branch).forEach(([k, v]) => {
                            if(dir[keyn]?.[key]?.[k]){
                                _tasks.push(...dir[keyn][key][k].map(dir => {
                                    const source = [`${srcRoot}${branchRoot}${v}${dir}*`];
                                    const destination = `${destRoot}${dest[keyn][key]}${v}${dir}`;
    
                                    return behavior({key, source, destination});
                                }));
                            }else{
                                const source = [`${srcRoot}${branchRoot}${v}*`];
                                const destination = `${destRoot}${dest[keyn][key]}${v}`;
    
                                _tasks.push(behavior({key, source, destination}));
                            }
                        });
                    }else{
                        const source = [`${srcRoot}${value}*`];
                        const destination = `${destRoot}${dest[keyn][key]}`;
    
                        _tasks.push(behavior({key, source, destination}));
                    }
                }else{
                    if(dest[keyn][key]?.branch){
                        const {root: branchRoot, branch} = dest[keyn][key];
    
                        Object.entries(branch).forEach(([, v], i) => {
                            const source = [`${srcRoot}${value}${dir[keyn][key][i]}*`];
                            const destination = (Boolean(v)) ? `${destRoot}${branchRoot}${v}` : `${destRoot}`;
    
                            _tasks.push(behavior({key, source, destination}));
                        });
                    }else{
                        _tasks.push(...dir[keyn][key].map(dir => {
                            const source = [`${srcRoot}${value}${dir}*`];
                            const destination = `${destRoot}${dest[keyn][key]}${dir}`;
    
                            return behavior({key, source, destination});
                       }));
                    }
                }
            });
        }else{
            if(dest[keyn]){
                if(dest[keyn]?.branch){
                    const {root: branchRoot, branch} = dest[keyn];
    
                    Object.entries(branch).forEach(([k, v]) => {
                        const source = [`${srcRoot}${branchRoot}${v}*`];
                        const destination = `${destRoot}${branchRoot}${v}`;
    
                        _tasks.push(behavior({key: keyn, source, destination}));
                    });
                }
            }else{
                const source = [`${srcRoot}*`];
                const destination = `${destRoot.slice(0, -1)}${dest[keyn]}`;
                
                _tasks.push(behavior({key: keyn, source, destination}));
            }
        }        
    }

    return _tasks;
});

module.exports = {
    getTasks
};