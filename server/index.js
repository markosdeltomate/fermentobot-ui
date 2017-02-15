import http from 'http';
import express from 'express';
import mongoose from 'mongoose';

// config and settings files
import config from './config';
import expressConf from './express';
import routes from './routes';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
mongoose.connect(config.mongo.uri, config.mongo.options);

let app = express(),
    server = app.server = http.createServer(app);

expressConf(app);
routes(app);

// Start server
server.listen(config.port, () => {
    console.log('BeerBotJS server listening on %d', config.port);
});

export default app;
