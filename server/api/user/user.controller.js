import User from './user.model';
//import passport from 'passport';
import config from '../../config';
import jwt from 'jsonwebtoken';

let validationError = (res, err) => {
    return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
    User.find({}, '-salt -hashedPassword', (err, users) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(users);
    });
}

/**
 * Creates a new user
 */
export function create(req, res) {
    var newUser = new User(req.body);
    newUser.provider = 'google';
    newUser.role = 'user';
    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            return validationError(res, err);
        }
        let token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresIn: 60 * 5
        });
        res.json({
            token: token
        });
    });
}

/**
 * Get a single user
 */
export function show(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401);
        }
        res.json(user.profile);
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', (err, user) => { // don't ever give out the password or salt
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401);
        }
        res.json(user);
    });
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
    res.redirect('/');
}
