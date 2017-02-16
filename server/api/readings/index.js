import express from 'express';
import {batchIndex, lastHour, lastDay, lastWeek, range, test} from './readings.controller';
//import {isAuthenticated} from '../../auth/auth.service';

let router = express.Router();
router.get('/', batchIndex);
router.get('/:batchId', lastHour);
router.get('/:batchId/recent', lastHour);
router.get('/:batchId/day', lastDay);
router.get('/:batchId/week', lastWeek);
router.get('/:batchId/range/:dateFrom', range);
router.get('/:batchId/range/:dateFrom/:dateTo', range);
router.get('/:batchId/resolution', test);

//not implemented yet
//router.post('/', isAuthenticated(), add);

export {router as default};
