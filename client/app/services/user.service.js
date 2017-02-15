import RequestService from './request.service';

class UserService  extends RequestService{
    constructor($injector) {
        'ngInject';

        super($injector);
        this.apiBaseUrl = '/api/users';
    }

    show() {
        let opts = {
            method: 'GET',
            url: this.apiBaseUrl,
            saveCache: true
        };
        return this.request(opts);
    }
    get() {
        let opts = {
            method: 'GET',
            url: `${this.apiBaseUrl}/me`,
            saveCache: true
        };
        return this.request(opts);
    }
    create(data) {
        let opts = {
            method: 'POST',
            url: this.apiBaseUrl,
            clearCache: true,
        };
        return this.request(opts);
    }
    update(data) {
        let opts = {
            method: 'PUT',
            url: `${this.apiBaseUrl}`,
            clearCache: true,
        };
        return this.request(opts);
    }
    delete(id) {
        let opts = {
            method: 'DELETE',
            url: this.apiBaseUrl,
            clearCache: true,
            params: {
                _id: id
            }
        };
        return this.request(opts);
    }
}

export default UserService;
