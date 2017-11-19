angular.module('postapp').factory('packageDataFactory', packageDataFactory);

function packageDataFactory($http) {
    return {
       searchPackage: searchPackage,
        getAdmins: getAdmins,
        getDetails: getDetails
    };
    
    function searchPackage(postData, vm, offset) {
        return $http.post('/api/packages/search?offset=' + offset + '&count=10', postData).then(function(response){
                vm.searchResults = response.data.content;
                vm.totalCount = response.data.itemCount;
                }).catch(function(error){
                    console.log(error);
                });
    }

    function getDetails(result) {
        if (result.package_type == 'invoice') {
            return $http.get('/api/invoices/' + result.packageId).then(function(response) {
                result.details = response.data;
                console.log(result.details);
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            return $http.get('/api/mails/' + result.packageId).then(function(response) {
                result.details = response.data;
                console.log(result.details);
            }).catch(function (error) {
                console.log(error);
            });
        }
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