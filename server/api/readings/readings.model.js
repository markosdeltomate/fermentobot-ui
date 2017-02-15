'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema,
    ReadingsSchema = new Schema({
        time: Date,
        value: Number,
        batchId: {type: String, index: true},
        humidity: Boolean,
        status: String
    }),
    model = mongoose.model('Readings', ReadingsSchema);

export { model as default};
