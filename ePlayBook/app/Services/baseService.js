(function () {
    'use strict';
    angular.module("ePlayBook")
        .factory("baseSvc", ["$http","$q", function ($http, $q) {
            //Get data from data.json
            var getRequest = function (query) {
                var deferred = $q.defer();                
                $http({                    
                    url: query,
                    method: "GET"
                })
                    .then(function onSuccess(response) {
                        deferred.resolve(response.data);
                    })
                    .catch(function onError(response) {
                        deferred.reject(response.status);
                    });
                return deferred.promise;
            };

            return {

                getRequest: getRequest
            };

        }]);

})();