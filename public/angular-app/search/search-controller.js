angular.module('postapp').controller('SearchController', SearchController);

function SearchController ($scope) {
    var vm = this;
    $scope.pageClass = 'page-search';
}