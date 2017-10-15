(function () {
    'use strict';

    angular.module('postapp', ['ui.router', 'ngAnimate'])
        .config(config);

    function config($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('homepage', {
                url: '/',
                templateUrl: 'angular-app/home/home.html',
                controller: HomeController,
                controllerAs: 'vm'
            })
            .state('searchpage', {
                url: '/mails',
                templateUrl: 'angular-app/search/search.html',
                controller: MailsController,
                controllerAs: 'vm'
            })
            .state('newmailpage', {
                url: '/newmail',
                templateUrl: 'angular-app/new-mail/new-mail.html',
            })
            .state('loginpage', {
                url: '/login',
                templateUrl: 'angular-app/login/login.html',
            })
            .state('signuppage', {
                url: '/signup',
                templateUrl: 'angular-app/signup/signup.html',
            });

        function run($rootScope) {
            // track current state for active tab
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.currentState = toState.name;
            });
        }
    }
})();

