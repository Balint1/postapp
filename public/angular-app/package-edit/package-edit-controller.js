angular.module('postapp').controller('PackageEditController', PackageEditController);

function PackageEditController ($scope) {
    var vm = this;
    $scope.pageClass = 'page-package-edit';
}