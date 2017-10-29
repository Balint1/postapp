angular.module('postapp', ['ngRoute', 'ngAnimate'])
    .config(config);

function config($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/home/home.html',
            controller: HomeController,
            controllerAs: 'vm'
        })
        .when('/search', {
            templateUrl: 'angular-app/search/search.html',
            controller: SearchController,
            controllerAs: 'vm'
        })
        .when('/newmail', {
            templateUrl: 'angular-app/new-package/new-package.html',
            controller: NewPackageController,
            controllerAs: 'vm'
        })
        .when('/login', {
            templateUrl: 'angular-app/login/login.html',
            controller: LoginController,
            controllerAs: 'vm'
        });
}

