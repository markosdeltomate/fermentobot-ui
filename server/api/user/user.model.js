import mongoose from 'mongoose';
//import crypto from 'crypto';
import {signToken} from '../../auth/auth.service';


let Schema = mongoose.Schema,
    authTypes = [
    //    'local',
        'google'
    ],
    //validatePresenceOf,
    model,
    UserSchema = new Schema({
        'kind': String,
        'gender': String,
        'sub': {
            type: String,
            index: {unique: true}
        },
        'name': String,
        'given_name': String,
        'family_name': String,
        'profile': String,
        'picture': String,
        'email': {
            type: String,
            lowercase: true,
            index: {unique: true}
        },
        'email_verified': Boolean,
        'locale': String,
        'role': {
            type: String,
            default: 'user'
        },
        //    hashedPassword: String,
        //    salt: String,
        'provider': String
    });

/**
 * Virtuals
 */
/*
UserSchema
    .virtual('password')
    .set(function setPassword(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function getPassword() {
        return this._password;
    });
*/
// Public profile information
/*
UserSchema
    .virtual('profile')
    .get(function getProfile() {
        return {
            'name': this.name,
            'role': this.role
        };
    });
*/
// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function getToken() {
        return signToken({
            'sub': this.sub,
            'email': this.email,
            'role': this.role
        });
    });

/**
 * Validations
 */

// Validate empty email
UserSchema
    .path('email')
    .validate(function validateEmail(email) {
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return email.length;
    }, 'Email cannot be blank');
/*
// Validate empty password
UserSchema
    .path('hashedPassword')
    .validate(function validatePassword(hashedPassword) {
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return hashedPassword.length;
    }, 'Password cannot be blank');
*/
// Validate email is not taken
UserSchema
    .path('email')
    .validate(function validateEmailVsToken(value, respond) {
        this.constructor.findOne({
            email: value
        }, (err, user) => {
            if (err) {
                throw err;
            }
            if (user) {
                if (this.id === user.id) {
                    return respond(true);
                }
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');
/*
validatePresenceOf = (value) => {
    return value && value.length;
};*/

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    /*authenticate(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },*/

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    /*makeSalt() {
        return crypto.randomBytes(16).toString('base64');
    },*/

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    /*encryptPassword(password) {
        if (!password || !this.salt) {
            return '';
        }
        let salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }*/
};
model = mongoose.model('User', UserSchema);

export {model as default};
