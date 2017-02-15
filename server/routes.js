import errors from './errors';
import readingsRoute from './api/readings';
import userRoute from './api/user';
import auth from './auth';

export default function routes(app) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        next();
    });

    // Insert routes below
    app.use('/api/readings', readingsRoute);
    app.use('/api/users', userRoute);

    app.use('/auth', auth);

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|client|components|app|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/(*|!app.*)')
        .get((req, res) => {
            res.sendFile('404.html', {
                root: 'server/views'
            });
        });
}
