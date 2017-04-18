(function () {
    angular.module("ePlayBook")
        .factory("enums", [function () {

            var Status = {
                Reserching: 1,
                Pending: 2,
                Approved: 3,
                Declined: 4,
                properties: {
                    1: { name: "Reserching", value: 1 },
                    2: { name: "Pending Approval", value: 2 },
                    3: { name: "Approved", value: 3 },
                    4: { name: "Declined", value: 4 }
                }
            }

            return {
                Status: Status
            };

        }]);

})();