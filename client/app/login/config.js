import LoginController from './login.controller.js';

export function configLogin($stateProvider) {
    'ngInject';
    $stateProvider.state('login', {
        url: '/login/',
        controller: LoginController,
        controllerAs: 'login',
        template: require('./login.html'),
        data: {
            pageTitle: 'Login'
        }
    });
    $stateProvider.state('redirect', {
        url: '/redirect',
        controller: LoginController,
        controllerAs: 'redirect',
        template: require('./redirect.html')
    });
    $stateProvider.state('callback', {
        url: '/login/callback?code',
        controller: LoginController,
        controllerAs: 'login',
        templateUrl: require('./callback.html')
    });
}