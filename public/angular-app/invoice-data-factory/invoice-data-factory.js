angular.module('postapp').factory('invoiceDataFactory', invoiceDataFactory);

function invoiceDataFactory($http) {
    
    return {
        postInvoice: postInvoice,
        putInvoice: putInvoice
    };
    
    function postInvoice(invoice) {
        return $http.post('/api/invoices', invoice).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }

    function putInvoice(invoice, id) {
        return $http.put('/api/invoices/' + id, invoice).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }

}