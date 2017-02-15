let mongo = {
    uri: process.env.MONGOLAB_URI,
    options: {
        db: {
            safe: true
        }
    }
};
export {mongo as default};
