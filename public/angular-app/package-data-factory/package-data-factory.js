angular.module('postapp').factory('packageDataFactory', packageDataFactory);

function packageDataFactory($http) {
    return {
       searchPackage: searchPackage,
        getAdmins: getAdmins
    };
    
    function searchPackage(postData, vm) {
        return $http.post('/api/packages/search', postData).then(function(response){
                vm.searchResults = response.data;
                }).catch(function(error){
                    console.log(error);
                });
    }

    function getAdmins(vm) {
        return $http.get('/api/admins').then(function(response) {
            console.log(response);
            vm.admins = response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }
}