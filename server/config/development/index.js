import path from 'path';

import mongo from './mongo';
import google from './google';

let development = {
    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: process.env.APP_SESSION,
        app: process.env.APP_ID
    },
    root: path.normalize(__dirname + '../..'),
    port: process.env.PORT || 8000,
    mongo: mongo,
    google: google
};


export {development as default};
