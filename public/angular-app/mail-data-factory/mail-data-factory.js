angular.module('postapp').factory('mailDataFactory', mailDataFactory);

function mailDataFactory($http) {

    return {
        postMail: postMail,
        putMail: putMail
    };

    function postMail(mail) {
        return $http.post('/api/mails', mail).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }

    function putMail(mail, id) {
        return $http.put('/api/mails/' + id, mail).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }

}