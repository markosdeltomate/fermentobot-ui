let google = {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    //callbackURL: `${process.env.DOMAIN}/login/callback`
    callbackURL: `${process.env.DOMAIN}/redirect`
};
export {google as default};
