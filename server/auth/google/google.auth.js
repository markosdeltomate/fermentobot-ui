import request from 'request';
//import {validateToken} from '../auth.service';
import config from '../../config';

export default class GoogleAuth {
    constructor(User) {
        this._User = User;
        this.accessTokenUrl = 'https://www.googleapis.com/oauth2/v4/token';
        this.peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        this.params = {
            'client_id': config.google.clientID,
            'client_secret': config.google.clientSecret,
            'redirect_uri': config.google.callbackURL,
            'grant_type': 'authorization_code'
        };
        this.req = null;
        this.res = null;
    }

    handleMainRequest(req, res) {
        this.params.code = req.body.code;
        this.req = req;
        this.res = res;
        return this.exchangeCodeForAuthToken();

    }

    exchangeCodeForAuthToken() {
        return request.post(this.accessTokenUrl, { json: true, form: this.params }, this.handleRequestAuthTokenSucces.bind(this));
    }

    handleRequestAuthTokenSucces(err, response, token) {
        if (token.error) {
            return this.res.status(400).json({ message: token.error });
        }
        let accessToken = token.access_token,
            headers = { Authorization: 'Bearer ' + accessToken };
        //console.log('========== handleRequestAuthTokenSucces ==========');
        //console.log(token);
        if (err) {
            return this.res.status(500).json(err);
        }
        // Step 2. Retrieve profile information about the current user.
        return request.get({ url: this.peopleApiUrl, headers: headers, json: true }, this.handleRequestProfileSucces.bind(this));
    }

    handleRequestProfileSucces(err, response, profile) {
        //console.log('========== handleRequestAuthTokenSucces ==========');
        //console.log(response);
        if (err) {
            return this.res.status(500).json(err);
        }
        if (profile.error) {
            console.log('Google auth profile error.');
            return this.res.status(500).json(profile.error);
        }

        return this.getUser(profile);

        /*if (this.req.header('Authorization')) {
            // Step 3a. Link user accounts.
            this.updateUser(profile);
        } else {
            // Step 3b. Create a new user account or return an existing one.
            this.createUser(profile);
        }*/
    }

/*    updateUser(profile) {
        this._User.findOne({ sub: profile.sub }, (error, existingUser) => {
            if (error) {
                console.log(error);
            }
            if (existingUser) {
                return this.res.status(409).send({ message: 'There is already a Google account that belongs to you' });
            }

            let authToken = this.req.header('Authorization').split(' ')[1],
                payload = validateToken(authToken, config.TOKEN_SECRET);


            this._User.findById(payload.sub, (err, user) => {
                if (err) {
                    console.log(err);
                }
                if (!user) {
                    this.createUser(profile);
                    //return this.res.status(400).send({ message: 'User not found' });
                } else {
                    user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                    user.save(this.handleSave.bind(this, user));
                }
            });
        });
    }*/
    createUser(profile) {
        return this._User.create(profile, (err) => {
            if (err) {
                return this.res.status(500).json(err);
            }
            return this.getUser(profile);
        });
    }
    getUser(profile) {
        profile.picture = profile.picture.replace('sz=50', 'sz=200');
        return this._User.findOne({ email: profile.email }, (error, existingUser) => {
            if (error) {
                return this.res.status(500).json(error);
            }
            if (existingUser) {
                return this.res.status(200).json({ token: existingUser.token });
            }
            return this.createUser(profile);
        });
    }
}
