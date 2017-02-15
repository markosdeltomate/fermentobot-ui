let google = {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    //callbackURL: `${process.env.DOMAIN}:${process.env.PORT || 8000}/login/callback`
    callbackURL: `${process.env.DOMAIN}:${process.env.PROXY_PORT || process.env.PORT || 8000}/redirect`
};
export {google as default};
