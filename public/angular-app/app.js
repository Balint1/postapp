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
            templateUrl: 'angular-app/mail-list/mails.html',
            controller: MailsController,
            controllerAs: 'vm'
        });
}
