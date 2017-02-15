/**
 * Using standard naming convention for endpoints.
 * GET     /readings/:batchId                  ->  lastHour
 * GET     /readings/:batchId/day              ->  lastDay
 * GET     /readings/:batchId/week             ->  lastWeek
 * GET     /readings/:batchId/range/:dateFrom      ->  range
 * GET     /readings/:batchId/range/:dateFrom/:dateTo  ->  range
 */
'use strict';

//import _ from 'lodash';
import Readings from './readings.model';
import moment from 'moment';

function handleError(res, err) {
    return res.status(500).json(err);
}
export function batchIndex(req, res) {
    Readings
        .aggregate()
        .group({_id: "$batchId"})
        .exec((err, batches) => {
            if (err) {
                return handleError(res, err);
            }

            return res.status(200).json(batches);
        });
}

export function getByDate(req, res, dateFrom, dateTo = moment()) {
    //console.log(dateFrom);
    //console.log(dateTo);
    Readings.find({
        batchId: req.params.batchId,
        time: {
            $lte: dateTo.toDate(),
            $gte: dateFrom.toDate()
        }
    }, (err, readings) => {
        if (err) {
            return handleError(res, err);
        }
        if (!readings) {
            return res.status(404);
        }
        return res.status(200).json(readings);
    });
}

// Get last hour activity
export function lastHour(req, res) {
    let hour = moment().subtract(1, 'hour');
    getByDate(req, res, hour);
}

// Get last day activity
export function lastDay(req, res) {
    let day = moment().subtract(1, 'day');
    getByDate(req, res, day);
}

// Get last week activity
export function lastWeek(req, res) {
    let week = moment().subtract(1, 'week');
    getByDate(req, res, week);
}

// Get ranged activity
export function range(req, res) {
    let dateFrom = moment(req.params.dateFrom, 'YYYYMMDDHHmm'),
        dateTo = (req.params.dateTo) ? moment(req.params.dateTo, 'YYYYMMDDHHmm') : moment();
    getByDate(req, res, dateFrom, dateTo);
}


// Creates a new readings in the DB.
export function add(req, res) {
    Readings.create(req.body, (err, readings) => {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(readings);
    });
}

export function log(data) {
    Readings.create(data, (err, readings) => {
        if (err) {
            return handleError(err);
        }
        return readings;
    });
}


