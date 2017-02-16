export function configDefaultRoute($urlRouterProvider, $locationProvider, $authProvider) {
    'ngInject';
    $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
    //$authProvider.storageType = 'localStorage';
    $authProvider.google({
        clientId: '832446513365-8jtfmap7dlefdrhmid8l3d2tgp3dml0d.apps.googleusercontent.com',
        redirectUri: `${location.protocol}//${location.hostname}:8080/redirect`,
        display: 'popup',
        scope: ['profile', 'email']
    });

    $urlRouterProvider.otherwise('/dashboard/');
    $locationProvider.html5Mode(true);
}

export function configRun($rootScope, $auth, $location, $uibModalStack) {
    'ngInject';
    $rootScope.$on('$stateChangeSuccess', function onStateChangeSuccess(ev, to) {
        $rootScope.currentState = to.name;
    });
    $rootScope.$on('$stateChangeStart', (event, to) => {
        let payload;
        if (to.authenticate && !$auth.isAuthenticated()) {
            event.preventDefault();
            return $location.path('/login/');
        }

        if ($auth.isAuthenticated() && to.name === 'login') {
            event.preventDefault();
            return $location.path('/dashboard/');
        }
        payload = $auth.getPayload();
        if (to.authenticate !== 'user' && payload && to.authenticate !== payload.role) {
            event.preventDefault();
            return $location.path('/dashboard/');
        }
        $uibModalStack.dismissAll('stateChangeStart');
    });
}