angular.module('postapp', ['ngRoute', 'ngAnimate', 'angularUtils.directives.dirPagination', 'angular-jwt'])
    .config(config)
    .run(run);

function config($httpProvider, $routeProvider) {

    $httpProvider.interceptors.push(AuthInterceptor);

    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/home/home.html',
            controller: HomeController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/search', {
            templateUrl: 'angular-app/search/search.html',
            controller: SearchController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/newmail', {
            templateUrl: 'angular-app/new-package/new-package.html',
            controller: NewPackageController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/login', {
            templateUrl: 'angular-app/login/login.html',
            controller: LoginController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/edit/:id', {
            templateUrl: 'angular-app/package-edit/package-edit.html',
            controller: PackageEditController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/register', {
            templateUrl: 'angular-app/register/register.html',
            controller: RegisterController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }
    });
}

