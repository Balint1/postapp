angular.module('postapp').factory('invoiceDataFactory', invoiceDataFactory);

function invoiceDataFactory($http) {
    
    return {
        postInvoice: postInvoice
    };
    
    function postInvoice(invoice) {
        return $http.post('/api/invoices', invoice).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }
    
}