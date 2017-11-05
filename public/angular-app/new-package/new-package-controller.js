angular.module('postapp').controller('NewPackageController', NewPackageController);

function NewPackageController ($scope, mailDataFactory, invoiceDataFactory, $location) {
    var vm = this;
    $scope.pageClass = 'page-new-package';
    
    vm.addPackage = function () {
        var postData;
        var isoDate;
        if (vm.time) {
            isoDate = new Date(vm.time).toISOString();
        }

        if (vm.new_package_type === 'invoice') {
            postData = {
                admin: {
                    name: vm.admin
                },
                adress: {
                    adress: vm.adress,
                    city: vm.city,
                    zip: vm.zip
                },
                brutto: vm.brutto,
                division: vm.division,
                expiry: vm.expiry,
                netto: vm.netto,
                package_comment: vm.comment,
                package_type: vm.new_package_type,
                subject: vm.subject,
                time: isoDate,
                invoice_number: vm.invoice_number
            };

            if (vm.submitForm.$valid) {
                invoiceDataFactory.postInvoice(postData).then(function (response) {
                    if(response.status === 201) {
                        $location.path('/search');
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
        else if (vm.new_package_type === 'mail' || vm.new_package_type === 'packet' || vm.new_package_type === 'gazette') {
            postData = {
                admin: {
                    name: vm.admin
                },
                adress: {
                    adress: vm.adress,
                    city: vm.city,
                    zip: vm.zip
                },
                division: vm.division,
                package_comment: vm.comment,
                package_type: vm.new_package_type,
                subject: vm.subject,
                time: isoDate,
                category: vm.category,
                count: vm.count,
                delivery_type: vm.delivery,
                extra_price: vm.extra_price,
                value: vm.value,
                weight: vm.weight,
                weight_price: vm.weight_price
            };

            if (vm.submitForm.$valid) {
                mailDataFactory.postMail(postData).then(function (response) {
                   if (response.status === 201) {
                       $location.path('/search');
                   }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }

    }
}