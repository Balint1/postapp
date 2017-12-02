angular.module('postapp').controller('RegisterController', RegisterController);

function RegisterController($scope, $http) {
    var vm = this;
    $scope.pageClass = 'page-register';
    
    vm.signUp = function () {
        var user = {
            username: vm.username,
            password: vm.password
        };

        if (!vm.username || !vm.password) {
            vm.error = "Please add a username and a password!";
            vm.registered = false;
            vm.failed = true;
        } else {
            if (vm.password !== vm.rpassword) {
                vm.error = "Please make sure the passwords match!";
                vm.registered = false;
                vm.failed = true;
            } else {
                $http.post('/api/users/register', user).then(function (result) {
                    console.log(result);
                    vm.failed = false;
                    vm.registered = true;
                }).catch(function (error) {
                    console.log(error);
                    vm.error = "User already exists!"
                    vm.failed = true;
                    vm.registered = false;
                });
            }
        }

    }

}