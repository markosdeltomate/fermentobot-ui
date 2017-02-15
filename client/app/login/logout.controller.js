export class LogoutController {
    constructor($auth, $state, $uibModalInstance) {
        'ngInject';
        this.$auth = $auth;

        this.$modal = $uibModalInstance;
    }

    doLogout() {
        this.$auth.logout();
        this.$modal.close();
    }

    cancel() {
        this.$modal.dismiss();
    }
}
