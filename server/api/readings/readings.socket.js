/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import Readings from './readings.model';
import moment from 'moment';

function onSave(socket, doc) {
    console.log('Readings schema changed, readings:update emitted', doc);
    socket.emit('readings:update', doc);
}

function handleError(err) {
    console.error(err);
    return err;
}

function create(doc) {
    doc.date = moment().toDate();
    Readings.create(doc, (err, readings) => {
        if (err) {
            return handleError(err);
        }
        console.log(readings);
    });
}

export function register(socket) {
    Readings.schema.post('save', (doc) => {
        onSave(socket, doc);
    });

    socket.on('data', (data) => {
        //TODO: do something if fails or succeeds?
        create(data);
    });
}




