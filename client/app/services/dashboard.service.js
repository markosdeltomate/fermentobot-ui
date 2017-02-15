import RequestService from './request.service';
class DashboardService extends RequestService {
    constructor($injector) {
        'ngInject';
        super($injector);
        this.apiBaseUrl = '/api/readings';
    }

    getBatches() {
        return this.request({
            url: this.apiBaseUrl,
            method: 'GET'
        });
    }
    getHistory(batchId, range = '', from = '', to = '') {
        if (!batchId) {
            throw new Error('DASHBOARD SERVICE: Can\'t request a history without an batchId');
        }

        let url = `${this.apiBaseUrl}/${batchId}/${range}`;

        url = (from) ? `${url}/${from}` : url;
        url = (from && to) ? `${url}/${to}` : url;

        return this.request({
            url,
            method: 'GET'
        });
    }
}

export default DashboardService;
