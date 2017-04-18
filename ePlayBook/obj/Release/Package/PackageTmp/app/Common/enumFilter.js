(function () {
    angular.module("ePlayBook")
        .filter("statusValueToName", ["enums",function (enums) {
            return function (value) {
                return enums.Status.properties[value].name;
            }
        }]);

})();