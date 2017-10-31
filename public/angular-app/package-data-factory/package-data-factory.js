angular.module('postapp').factory('packageDataFactory', packageDataFactory);

function packageDataFactory($http) {
    return {
       searchPackage: searchPackage,
        getAdmins: getAdmins
    };
    
    function searchPackage(postData, vm, offset) {
        return $http.post('/api/packages/search?offset=' + offset + '&count=10', postData).then(function(response){
                vm.searchResults = response.data;
                vm.totalCount = 100;
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