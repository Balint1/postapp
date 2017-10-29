angular.module('postapp').controller('LoginController', LoginController);

function LoginController ($scope) {
    var vm = this;
    $scope.pageClass = 'page-login';
}