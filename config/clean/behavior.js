const clean = params => {
    const {destination} = params;    

    return {
        stream: (() => import("del").then(del => del.deleteAsync(destination)))
    };
}

module.exports = {
    clean
};