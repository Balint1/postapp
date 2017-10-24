angular.module('postapp').controller('NewPackageController', NewPackageController);

function NewPackageController ($scope) {
    var vm = this;
    $scope.pageClass = 'page-new-package';
}