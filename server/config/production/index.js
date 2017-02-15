import path from 'path';

import mongo from './mongo';
import google from './google';

let production = {
    secrets: {
        session: process.env.APP_SESSION,
        app: process.env.APP_ID
    },
    root: path.normalize(__dirname + '../..'),
    port: process.env.PORT || 8000,
    mongo: mongo,
    google: google
};


export {production as default};
