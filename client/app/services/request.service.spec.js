import RequestService from './request.service';

describe('RequestService', () => {
    let $q,
        $http,
        $cacheFactory;
    beforeEach(angular.mock.inject((_$q_) => {
        $q = _$q_;

    }));
    beforeEach(() => {
        $http = jasmine.createSpy('$http').and.returnValue($q.defer());
        $cacheFactory = jasmine.createSpy('$cacheFactory');
        $cacheFactory.get = jasmine.createSpy('get');
    });
    describe('service constructor', () => {
        it('should create cache if not defined', () => {
            $cacheFactory.get.and.returnValue(undefined);
            let service = new RequestService($http, $q, $cacheFactory);
            expect(service.$http).toBe($http);
            expect(service.$q).toBe($q);
            expect($cacheFactory.get).toHaveBeenCalledWith('appCache');
            expect($cacheFactory).toHaveBeenCalledWith('appCache');
        });

        it('should not create cache if is defined', () => {
            $cacheFactory.get.and.returnValue('fooBar');
            let service = new RequestService($http, $q, $cacheFactory);
            expect(service.$http).toBe($http);
            expect(service.$q).toBe($q);
            expect($cacheFactory.get).toHaveBeenCalledWith('appCache');
            expect($cacheFactory).not.toHaveBeenCalledWith();
        });
    });
});
