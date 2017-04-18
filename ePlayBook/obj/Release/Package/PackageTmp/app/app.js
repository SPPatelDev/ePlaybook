/// <reference path="c:\users\patels38\documents\visual studio 2015\Projects\ePlayBook\ePlayBook\Templates/listoftargets.html" />
(function () {
    'use strict'

    angular.module("ePlayBook", ["ui.router", "ngSanitize","ui.bootstrap","angularCharts","ngNotify"])
    .run(function (targetService) {
        targetService.initialLoad();
    });

})();