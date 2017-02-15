import express from 'express';
import {index, me, show} from './user.controller';
import {hasRole, isAuthenticated} from '../../auth/auth.service';

let router = express.Router();

router.get('/me', isAuthenticated(), me);

export { router as default };
