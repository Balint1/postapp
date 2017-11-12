angular.module('postapp').directive('paNavigation', paNavigation);

function paNavigation() {
    return {
        restrict: 'E',
        templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
    };
}