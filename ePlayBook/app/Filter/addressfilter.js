(function () {
    angular.module("ePlayBook")
        .filter("address", [function () {

            return function (address) {
                if (!address)
                {
                    return "";
                }
                var addressCombined = "";
                if (address.address1 && address.address1 != "")
                    addressCombined += address.address1 + ","

                if (address.address2 && address.address2 != "")
                    addressCombined += address.address2 + ","

                if (address.city && address.city != "")
                    addressCombined += address.city + ","

                if (address.state && address.state != "")
                    addressCombined += address.state + ","

                if (address.country && address.country != "")
                    addressCombined += address.country + ","

                if (address.zip && address.zip != "")
                    addressCombined += address.zip + ","

                if (addressCombined != "") {
                    return addressCombined.slice(0, addressCombined.length - 1);
                }
                else
                    return "";
            }

        }]);

})();