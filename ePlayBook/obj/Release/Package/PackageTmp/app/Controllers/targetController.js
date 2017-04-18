(function () {
    angular.module("ePlayBook")
    .controller("TargetCtrl", ["enums", "targetService", "$stateParams", "$state", "$scope", "ngNotify", function (enums, targetService, $stateParams, $state, $scope, ngNotify) {

        var vm = this;
        vm.id = $stateParams.id;

        var currentYear = new Date().getFullYear();
        vm.statusList = enums.Status.properties;
        vm.years = [currentYear - 1, currentYear - 2];



        if (vm.id) {
            vm.target = targetService.getTarget(vm.id);
            vm.selectedStatus = vm.statusList[vm.target.status];
        }
        else {
            vm.selectedStatus = vm.statusList[1];
            vm.target = {
                companyInfo: {
                    compnayName: "",
                    address: {
                        address1: "",
                        address2: "",
                        city: "",
                        state: "",
                        country: "",
                        zip: ""
                    }
                },
                status: 1,
                keyContacts: [{ firstName: "", lastName: "", title: "", phone: "", emailAddress: "" }],
                financial: [{
                    "year": 2016,
                    "q1": {
                        "grossRevenue": null,
                        "totalExpenses": null

                    },
                    "q2": {
                        "grossRevenue": null,
                        "totalExpenses": null
                    },
                    "q3": {
                        "grossRevenue": null,
                        "totalExpenses": null
                    },
                    "q4": {
                        "grossRevenue": null,
                        "totalExpenses": null
                    }
                }]
            }
        }

        vm.addfinancial = function () {
            if (vm.target.financial.length < 2) {
                var year = vm.years;
                if (vm.target.financial[0])
                    year = _.filter(vm.years, function (year) { return (vm.target.financial[0].year != year) });

                vm.target.financial.push({
                    "year": year[0],
                    "q1": {
                        "grossRevenue": null,
                        "totalExpenses": null

                    },
                    "q2": {
                        "grossRevenue": null,
                        "totalExpenses": null
                    },
                    "q3": {
                        "grossRevenue": null,
                        "totalExpenses": null
                    },
                    "q4": {
                        "grossRevenue": null,
                        "totalExpenses": null
                    }
                });
            }
        };

        vm.addKeyContact = function () {
            vm.target.keyContacts.push({ firstName: "", lastName: "", title: "", phone: "", emailAddress: "" });
        };

        vm.removeKeyContact = function (contact) {
            vm.target.keyContacts = _.without(vm.target.keyContacts, _.findWhere(vm.target.keyContacts, {
                $$hashKey: contact.$$hashKey
            }));
        };

        vm.removeFinancial = function (financial) {
            vm.target.financial = _.without(vm.target.financial, _.findWhere(vm.target.financial, {
                $$hashKey: financial.$$hashKey
            }));
        }

        vm.validate = function () {
            if (!$scope.targetForm.$invalid) {
                if (vm.target.financial.length > 0 && vm.target.keyContacts.length > 0)
                    return true;

            }
            else {
                _.each($scope.targetForm.$error.required, function (o) {
                   // o.$$element[0].classList.add('has-error');
                });

                _.each($scope.targetForm.$error.pattern, function (o) {
                    o.$$element[0].classList.add('has-error');
                });

                _.each($scope.targetForm.$error.email, function (o) {
                    o.$$element[0].classList.add('has-error');
                });

                _.each($scope.targetForm.$error.min, function (o) {
                    o.$$element[0].classList.add('has-error');
                });
            }
        };

        vm.save = function () {

            vm.target.status = vm.selectedStatus.value;
            if (vm.validate()) {
                if (vm.id) {
                    var duplicateCheck = targetService.getTargetByTitle(vm.target.companyInfo.compnayName);
                    if (duplicateCheck && duplicateCheck.companyInfo.compnayName == vm.target.companyInfo.compnayName && duplicateCheck.id != vm.id) {
                        ngNotify.set("This target information is already available", { position: 'top', type: 'error', duration: 3000 });
                    }
                    else {
                        targetService.update(vm.target);
                        ngNotify.set('Target information is updated.', {
                            position: 'top', type: 'success', duration: 3000
                        });
                    }
                }
                else {
                    if (targetService.getTargetByTitle(vm.target.companyInfo.compnayName)) {
                        ngNotify.set("This target information is already available", { position: 'top', type: 'error', duration: 3000 });
                    }
                    else {
                        targetService.add(vm.target);
                        
                        ngNotify.set('Target information is saved.', {
                            position: 'top', type: 'success', duration: 3000
                        });

                        $state.go("target", { id: vm.target.id });
                    }
                }
                //  $state.go("targets");

            }
        }

        vm.cancel = function () {
            $state.go("targets");
        }
    }]);
})();