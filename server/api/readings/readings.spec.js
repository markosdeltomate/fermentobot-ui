'use strict';

//import should from 'should';
import app from '../../app';
import request from 'supertest';

describe('GET /api/readings', () => {

    it('should respond with JSON array', (done) => {
        request(app)
            .get('/api/readings')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});
