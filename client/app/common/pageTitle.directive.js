export function pageTitle($rootScope, $timeout) {
    return {
        restrict: 'A',
        scope: {},
        compile: () => {
            return {
                pre: angular.noop,
                pos: (scope, element) => {
                    let listener = (event, toState) => {
                        let title = '';
                        if (toState.data && toState.data.pageTitle) {
                            title = toState.data.pageTitle;
                        }
                        $timeout(() => {
                            element.text(title);
                        });
                    };
                    $rootScope.$on('$stateChangeStart', listener);
                }
            };
        }
    };
}
