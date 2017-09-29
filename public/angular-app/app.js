angular.module('postapp', ['ngRoute'])
.config(config)
.controller('HomeController', HomeController);

function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/home.html',
            controller: HomeController,
            controllerAs: 'vm'
        });
}

function HomeController () {
    var vm = this;
    vm.title = 'PostApp';
}