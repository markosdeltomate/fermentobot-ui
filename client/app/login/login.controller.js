class LoginController {
    constructor($auth, $state) {
        'ngInject';
        this.$auth = $auth;
        this.$state = $state;
        if (this.$auth.isAuthenticated()) {
            debugger;
            this.$state.go('dashboard');
        }
    }

    authenticate() {
        this.$auth
            .authenticate('google')
            .then(({data}) => {
                if (data.token) {
                    this.$auth.setToken(data.token);
                }
                this.$state.go('dashboard');
            })
            .catch((error) => {
                if (error.message) {
                    // Satellizer promise reject error.
                    console.error(error.message);
                } else if (error.data) {
                    // HTTP response error from server
                    console.error(error.data.message, error.status);
                } else {
                    console.error(error);
                }
            });
    }

}
export default LoginController;