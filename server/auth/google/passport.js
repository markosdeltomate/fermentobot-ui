import passport from 'passport';
import Google from 'passport-google-oauth';
let GoogleStrategy = Google.OAuth2Strategy;

export function setup(User, config) {
    passport
        .use(new GoogleStrategy({
            clientID: config.google.GOOGLE_ID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('google strategy logic');
            //process.nextTick(function googleAuth() {
            User.findOne({
                'google.id': profile.id
            }, (err, user) => {
                if (err) {
                    console.log('MONGOOOOOOOOOOSE ERROR');
                    return err;
                }
                if (user) {
                    return done(null, user);
                } else {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        role: 'user',
                        username: profile.username,
                        provider: 'google',
                        google: profile._json
                    });
                    user.save((error) => {
                        if (error) {
                            done(error);
                        }
                        return done(error, user);
                    });
                }
            });
            //});
        }
    ));
}
