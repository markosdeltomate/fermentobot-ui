import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import ejs from 'ejs';
import passport from 'passport';
import favicon from 'serve-favicon';
import methodOverride from 'method-override';
import morgan from 'morgan';
import config from './config';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

let MongoStore = connectMongo(session);

//import path from 'path';
import serveStatic from 'serve-static';
//import session from 'express-session';

export default function expressConf(app) {

    let viewPath = process.env.CLIENT_PATH || 'server/views',
        env = process.env.NODE_ENV || 'development';

    // Use bluebird
    mongoose.Promise = bluebird;

    // Main service configuration
    app.set('views', config.root + '/server/views');
    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');
    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());

    // Persist sessions with mongoStore
    // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
    app.use(session({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }));
    app.use(passport.initialize());
    //app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    if (env === 'development') {
        app.use(require('connect-inject')({
            ignore: ['.js', '.css', '.svg', '.ico', '.woff', '.png', '.jpg', '.jpeg']
        }));
    }

    app.use('/', serveStatic(viewPath));
    app.use(favicon(`${viewPath}/assets/favicon.ico`));

    app.use(morgan('dev'));

    app.use(errorHandler()); // Error handler - has to be last
}
