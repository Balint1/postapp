angular.module('postapp').controller('HomeController', HomeController);

function HomeController ($scope) {
    var vm = this;
    $scope.pageClass = 'page-home';
}