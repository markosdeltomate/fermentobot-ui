import {LogoutController} from '../login/logout.controller.js';
export class MenuController {
    constructor($uibModal, $state, $auth, $scope) {
        'ngInject';
        this.$uibModal = $uibModal;
        this.$state = $state;
        this.isAdmin = false;
        this.isLogged = false;
        this.$auth = $auth;

        $scope.$watch(() => this.$auth.getToken(), () =>{
            this.isLoggedIn();
        });
    }

    isLoggedIn() {
        this.isLogged = this.$auth.isAuthenticated();
        this.isAdmin = false;

        if (this.isLogged) {
            this.isAdmin = this.checkAdmin();
        }
    }

    checkAdmin() {
        return this.$auth.getPayload().role === 'admin';
    }

    logout() {
        this.$uibModal
            .open({
                controller: LogoutController,
                controllerAs: 'logout',
                templateUrl: 'login/logout.html',
                size: 'sm'
            })
            .result
            .finally(() => {
                this.isLoggedIn();
                this.$state.go('dashboard');
            });
    }
}

export function menuBarDirective() {
    return {
        replace: false,
        restrict: 'E',
        scope: false,
        controller: MenuController,
        controllerAs: 'menu',
        template: `
            <nav class="navbar navbar-default" ng-if="currentState !== 'login'">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button
                            type="button"
                            class="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#main-menu"
                            aria-expanded="false">
                          <span class="sr-only">Toggle navigation</span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" ui-sref="dashboard">
                          <img alt="Brand" src="../assets/images/bender.png">
                        </a>
                    </div>
                    <div class="collapse navbar-collapse" id="main-menu">
                        <ul class="nav navbar-nav">
                            <li ui-sref-active="active" ng-if="menu.isLogged && menu.isAdmin"><a ui-sref="profiles">Profiles</a></li>
                            <li ui-sref-active="active" ng-if="menu.isLogged && menu.isAdmin"><a ui-sref="settings">Settings</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                          <li ng-if="menu.isLogged"><a ng-click="menu.logout()" href="#">Logout</a></li>
                          <li ng-if="!menu.isLogged"><a ui-sref="login">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        `
    };
}

export function menuPostLink() {

}
