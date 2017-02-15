import express from 'express';
import GoogleAuth from './google.auth';
import User from '../../api/user/user.model';

let router = express.Router();

const googleAuth = new GoogleAuth(User);

router.post('/', googleAuth.handleMainRequest.bind(googleAuth));

export {
    router as
    default
};
