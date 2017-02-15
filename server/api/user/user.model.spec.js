import should from 'should';
//import app from '../../app';
import User from './user.model';

var user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@test.com',
    password: 'password'
});

describe('User Model', () => {
    before((done) => {
        // Clear users before testing
        User.remove().exec().then(() => {
            done();
        });
    });

    afterEach((done) => {
        User.remove().exec().then(() => {
            done();
        });
    });

    it('should begin with no users', (done) => {
        User.find({}, (err, users) => {
            users.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate user', (done) => {
        user.save(() => {
            var userDup = new User(user);
            userDup.save((err) => {
                should.exist(err);
                done();
            });
        });
    });

    it('should fail when saving without an email', (done) => {
        user.email = '';
        user.save((err) => {
            should.exist(err);
            done();
        });
    });

});
