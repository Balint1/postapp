angular.module('postapp').controller('NewMailController', NewMailController);

function NewMailController ($scope) {
    var vm = this;
    $scope.pageClass = 'page-new-mail';
}