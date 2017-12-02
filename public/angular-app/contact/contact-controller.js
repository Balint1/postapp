angular.module('postapp').controller('ContactController', ContactController);

function ContactController($scope) {
    var vm = this;
    $scope.pageClass = 'page-contact';
}