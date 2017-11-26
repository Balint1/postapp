angular.module('postapp').controller('PackageEditController', PackageEditController);

function PackageEditController ($scope, packageDataFactory, $location, $http, $routeParams, mailDataFactory, invoiceDataFactory) {
    var vm = this;
    var id = $routeParams.id;
    $scope.pageClass = 'page-package-edit';
    packageDataFactory.getAdmins(vm);

    $http.get('/api/mails/' + id).then(function (response) {
        vm.editing = response.data;
        var responseTime = new Date(response.data.time);
        responseTime.setHours(responseTime.getHours() + 1);
        vm.date = new Date(moment(responseTime).format());
        vm.comment = response.data.package_comment;
        vm.subject = response.data.subject;
        vm.adress = response.data.adress.adress;
        vm.city = response.data.adress.city;
        vm.zip = response.data.adress.zip;
        vm.division = response.data.division;
        vm.package_type = response.data.package_type;
        vm.admin = response.data.admin.name;
        vm.category = response.data.category;
        vm.delivery = response.data.delivery_type;
        vm.count = response.data.count;
        vm.weight = response.data.weight;
        vm.value = response.data.value;
        vm.weight_price = response.data.weight_price;
        vm.extra_price = response.data.extra_price;
        vm.sender = response.data.sender;
    }).catch(function (error) {
        $http.get('/api/invoices/' + id).then(function (response) {
            vm.editing = response.data;
            var responseTime = new Date(response.data.time);
            responseTime.setHours(responseTime.getHours() + 1);
            vm.date = new Date(moment(responseTime).format());
            vm.comment = response.data.package_comment;
            vm.subject = response.data.subject;
            vm.adress = response.data.adress.adress;
            vm.city = response.data.adress.city;
            vm.zip = response.data.adress.zip;
            vm.division = response.data.division;
            vm.package_type = response.data.package_type;
            vm.admin = response.data.admin.name;
            vm.invoice_number = response.data.invoice_number;
            vm.expiry = response.data.expiry;
            vm.brutto = response.data.brutto;
            vm.netto = response.data.netto;
        }).catch(function (error) {
            console.log(error);
        });
    });
    
    vm.editPackage = function () {
        var isoDate = new Date(vm.date).toISOString();
        console.log(vm.editing);
        var putData;
        var adminId;
        if (vm.admin === 'Jancsi') {
            adminId = 1;
        } else if (vm.admin === 'Peti') {
            adminId = 2;
        } else if (vm.admin === 'Peti') {
            adminId = 3;
        } else if (vm.admin === 'Peti') {
            adminId = 4;
        }

        if (vm.package_type == 'invoice') {
            putData = {
                admin: {
                    name: vm.admin,
                    id: adminId
                },
                adress: {
                    adress: vm.adress,
                    city: vm.city,
                    zip: vm.zip
                },
                division: vm.division,
                package_comment: vm.comment,
                package_type: vm.package_type,
                subject: vm.subject,
                time: isoDate,
                brutto: vm.brutto,
                expiry: vm.expiry,
                netto: vm.netto,
                invoice_number: vm.invoice_number
            };
            if (vm.editForm.$valid) {
                invoiceDataFactory.putInvoice(putData, id).then(function (response) {
                    if (response.status === 204) {
                        $location.path('/search');
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        } else {
            putData = {
                admin: {
                    name: vm.admin,
                    id: adminId
                },
                adress: {
                    adress: vm.adress,
                    city: vm.city,
                    zip: vm.zip
                },
                division: vm.division,
                package_comment: vm.comment,
                package_type: vm.package_type,
                subject: vm.subject,
                time: isoDate,
                category: vm.category,
                count: vm.count,
                delivery_type: vm.delivery,
                extra_price: vm.extra_price,
                value: vm.value,
                weight: vm.weight,
                weight_price: vm.weight_price,
                sender: vm.sender
            };

            if (vm.editForm.$valid) {
                mailDataFactory.putMail(putData, id).then(function (response) {
                    if (response.status === 204) {
                        $location.path('/search');
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    };

    vm.deletePackage = function () {
        $http.delete('/api/mails/' + id).then(function (response) {
            $location.path('/search');
        }).catch(function (error) {
            console.log(error);
        })
    }

}