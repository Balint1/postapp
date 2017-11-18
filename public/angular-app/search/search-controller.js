angular.module('postapp').controller('SearchController', SearchController);

function SearchController ($scope, packageDataFactory, $location, AuthFactory) {
    var vm = this;
    $scope.pageClass = 'page-search';
    packageDataFactory.getAdmins(vm);
    var postData;

    vm.itemsPerPage = 10;
    vm.offset = 0;
    vm.searching = false;
    vm.searchResults = null;

    vm.getData = function (pageno) {

        if (vm.searchResults) {
            for (var i = 0; i < vm.searchResults.length; i++) {
                vm.searchResults[i].expanded = false;
            }
        }

        vm.offset = (pageno - 1)*vm.itemsPerPage;
        console.log(pageno);
        packageDataFactory.searchPackage(postData, vm, vm.offset);
    };

    vm.getData(1);

    vm.searchPackages = function() {

        if (vm.searchResults) {
            for (var i = 0; i < vm.searchResults.length; i++) {
                vm.searchResults[i].expanded = false;
            }
        }

        vm.currentPage=1;
        var isoFromDate;
        var isoToDate;
        if (vm.fromDate) {
            isoFromDate = new Date(vm.fromDate).toISOString();
        }
        if (vm.toDate) {
            isoToDate = new Date(vm.toDate).toISOString();
        }

        postData = {
            packageId : vm.package_id,
            subject: vm.subject,
            package_type : vm.package_type,
            fromDate : isoFromDate,
            toDate: isoToDate,
            adress: {
                adress: vm.adress,
                city: vm.city,
                zip: vm.zip
            },
            division: vm.division,
            admin : {
                name : vm.admin
            },
            package_comment: vm.package_comment
        };

        if (!postData["packageId"]) {
            delete postData["packageId"];
        }
        if (!postData["subject"]) {
            delete postData["subject"];
        }
        if (!postData["package_type"]) {
            delete postData["package_type"];
        }
        if (!postData["fromDate"]) {
            delete postData["fromDate"];
        }
        if (!postData["toDate"]) {
            delete postData["toDate"];
        }
        if (!postData["adress"]) {
            delete postData["adress"];
        }
        if (!postData["division"]) {
            delete postData["division"];
        }
        if (!postData["admin"]["name"]) {
            delete postData["admin"];
        }
        if (!postData["package_comment"]) {
            delete postData["package_comment"];
        }

        console.log(postData);
        if (vm.searchForm.$valid) {
            packageDataFactory.searchPackage(postData, vm);
        }

    };
    
    vm.printTable = function () {
        var tableToPrint = document.getElementById("printable");
        var htmlToPrint = '' +
            '<style type="text/css">' +
            'table, th, td {' +
            'border:1px solid #000;' +
            'border-collapse: collapse;' +
            'padding;0.5em;' +
            '}' +
            '</style>';
        var newWin = window.open("");
        htmlToPrint += tableToPrint.outerHTML;
        newWin.document.write(htmlToPrint);
        newWin.print();
        newWin.close();
    };

    vm.rowClick = function (result) {
        result.expanded = !result.expanded;
        packageDataFactory.getDetails(result);
    };

    vm.editPackage = function (package) {
        $location.path('/edit/' + package.packageId);
    };

    vm.addNewPackage = function () {
        $location.path('/newmail');
    };

    vm.isLoggedIn = function () {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };

}