import DashboardController from './dashboard.controller';

export function configDashboard($stateProvider) {
    'ngInject';

    $stateProvider.state({
        name: 'dashboard',
        url: '/dashboard',
        authenticate: 'user',
        template: require('./dashboard.html'),
        controller: DashboardController,
        controllerAs: '$ctrl',
        data: {
            pageTitle: 'Dashboard'
        }
    });
}
