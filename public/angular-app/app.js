angular.module('postapp', ['ngRoute'])
.config(config);

function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/home/home.html',
            controller: HomeController,
            controllerAs: 'vm'
        })
        .when('/mails', {
            templateUrl: 'angular-app/search/search.html',
            controller: MailsController,
            controllerAs: 'vm'
        })
        .when('/newmail', {
            templateUrl: 'angular-app/new-mail/new-mail.html'
        })
        .when('/login', {
            templateUrl: 'angular-app/login/login.html'
        })
        .when('/signup', {
            templateUrl: 'angular-app/signup/signup.html'
        });
}
