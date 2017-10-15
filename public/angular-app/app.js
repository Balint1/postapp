angular.module('postapp', ['ngRoute', 'ngAnimate'])
    .config(config);

function config($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/home/home.html',
            controller: HomeController,
            controllerAs: 'vm'
        })
        .when('/mails', {
            templateUrl: 'angular-app/search/search.html',
            controller: SearchController,
            controllerAs: 'vm'
        })
        .when('/newmail', {
            templateUrl: 'angular-app/new-mail/new-mail.html',
            controller: NewMailController,
            controllerAs: 'vm'
        })
        .when('/login', {
            templateUrl: 'angular-app/login/login.html',
            controller: LoginController,
            controllerAs: 'vm'
        })
        .when('/signup', {
            templateUrl: 'angular-app/signup/signup.html',
            controller: SignupController,
            controllerAs: 'vm'
        });
}

