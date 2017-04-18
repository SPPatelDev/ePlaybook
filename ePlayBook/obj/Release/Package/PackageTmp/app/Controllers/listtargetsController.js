(function () {
    'use strict';
    angular.module("ePlayBook")
.controller("ListTargetsCtrl", ["targetService", "$uibModal", "ngNotify", function (targetService, $uibModal, ngNotify) {

    var vm = this;

    function init() {
        vm.targetData = targetService.getData();
    }
    init();

    vm.remove = function (id) {
        $uibModal.open({
            templateUrl: 'app/modalTemplate/delete.html',
            controller: function ($scope) {
                $scope.yes = function () {
                    $scope.$close();
                };
                $scope.no = function () {
                    $scope.$dismiss();
                };
            },
            size: 'sm',
        }).result.then(function (results) {
            targetService.remove(id);
            ngNotify.set('Target is deleted.', {
                position: 'top', type: 'success', duration: 3000
            });
            vm.targetData = targetService.getData();
        }, function () {

        });
    };
}]);

})();