export default class RequestService {
    constructor($injector) {
        let $http = $injector.get('$http'),
            $q = $injector.get('$q'),
            $cacheFactory = $injector.get('$cacheFactory');

        this.cache = $cacheFactory.get('appCache');
        if (!this.cache) {
            this.cache = $cacheFactory('appCache');
        }


        this.$q = $q;
        this.$http = $http;
    }

    request(opts, cancel = false) {
        if (!opts || !opts.url) {
            throw new Error('No options or url were provided for the request');
        }

        if (cancel) {
            opts.timeout = cancel.promise;
        }

        if (opts.saveCache && opts.method.toUpperCase() === 'GET') {
            opts.cache = this.cache;
        }

        if (opts.clearCache) {
            this.cache.remove(opts.url);
            //we clear the cached list if we delete or update a single item.
            if (opts.url !== this.apiBaseUrl) {
                this.cache.remove(this.apiBaseUrl);
            }
        }

        return this.$http(opts).then(({ data }) => data);
    }
}
