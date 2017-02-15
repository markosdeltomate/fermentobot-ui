import express from 'express';
import google from './google';

// Passport Configuration
let router = express.Router();

router.use('/google', google);

export {
    router as default
};
