angular.module('postapp').controller('MailsController', MailsController);

function MailsController($http) {
    var vm = this;
    vm.title = "Mail List";
    $http.get('/api/mails').then(function(response){
        console.log(response);
        vm.mails = response.data;
    });
    
}