angular.module('postapp').controller('SearchController', SearchController);

function SearchController ($scope, packageDataFactory) {
    var vm = this;
    $scope.pageClass = 'page-search';
    packageDataFactory.getAdmins(vm);
    var postData;

    vm.itemsPerPage = 10;
    vm.offset = 0;
    vm.searching = false;
    packageDataFactory.searchPackage(postData, vm, vm.offset);

    vm.searchPackages = function() {
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
            adress: vm.adress,
            division: vm.division,
            admin : vm.admin,
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
        if (!postData["admin"]) {
            delete postData["admin"];
        }
        if (!postData["package_comment"]) {
            delete postData["package_comment"];
        }

        console.log(postData);
        if (vm.searchForm.$valid) {
            packageDataFactory.searchPackage(postData, vm);
        }

    }
    
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
    }

    vm.rowClick = function (result) {
        result.expanded = !result.expanded;
        console.log(result.expanded);
    }

    vm.getData = function (pageno) {
        vm.offset = pageno*vm.itemsPerPage;
        packageDataFactory.searchPackage(postData, vm, vm.offset);
    }
}