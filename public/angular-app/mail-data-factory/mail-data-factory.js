angular.module('postapp').factory('mailDataFactory', mailDataFactory);

function mailDataFactory($http) {

    return {
        postMail: postMail
    };

    function postMail(mail) {
        return $http.post('/api/mails', mail).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }

}