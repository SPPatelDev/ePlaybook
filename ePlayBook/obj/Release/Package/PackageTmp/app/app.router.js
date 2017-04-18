(function () {
    angular.module("ePlayBook")
        .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

            $stateProvider.state("home", {
                url: '/',
                templateUrl: "app/Templates/home.html"
            }).state("targets", {
                url: '/targets',
                templateUrl: "app/Templates/listoftargets.html",
                controller: "ListTargetsCtrl",
                controllerAs: "vm"
            }).state("target", {
                url: '/target/:id',
                templateUrl: "app/Templates/target.html",
                controller: "TargetCtrl",
                controllerAs: "vm",
                params:{id:null}
            }).state("performance", {
                url: '/performance/:id',
                templateUrl: "app/Templates/performance.html",
                controller: "PerformanceCtrl",
                controllerAs: "vm",
                params: { id: null }
            }).state("OverallPerformance", {
                url: '/OverallPerformance',
                templateUrl: "app/Templates/overallperformance.html",
                controller: "OverallPerformanceCtrl",
                controllerAs: "vm"
            });
            $urlRouterProvider.otherwise('/');
        }]);

})();