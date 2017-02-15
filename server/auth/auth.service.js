import config from '../config';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../api/user/user.model';

let validateJwt = expressJwt({
    secret: config.secrets.session
});



/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
    return compose()
        // Validate jwt
        .use((req, res, next) => {
            // allow access_token to be passed through query parameter as well
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use((req, res, next) => {
            User.findOne({email: req.user.email}, (err, user) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).json({message: 'user not found'});
                }
                req.user = user;
                next();
            });
        });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                next();
            } else {
                res.send(403);
            }
        });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function validateToken(token, secret = null) {
    try {
        return jwt.verify(token, secret || config.secrets.session);
    } catch (err) {
        console.log('JWT validation error:', err.message);
        return false;
    }
}
/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(payload) {
    return jwt.sign(payload, config.secrets.session, {
        expiresIn: 60 * 60 * 5
    });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
    if (!req.user) {
        return res.json(404, {
            message: 'Something went wrong, please try again.'
        });
    }
    let token = signToken({_id: req.user._id, role: req.user.role});
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
}
