(function () {

    angular.module("ePlayBook")
       .controller("OverallPerformanceCtrl", ["targetService", function (targetService) {

           var vm = this;

           vm.Years = [{ 'year': 2016 }, { 'year': 2015 }];
           vm.charts = [{ 'chart': 'line' }, { 'chart': 'bar' }, { 'chart': 'point' }, {'chart':'area'}];

           vm.allCompnayProfit = [];          

           function initialLoad() {
               vm.targets = targetService.getData();
               vm.selectedYear = 2016;
               vm.selectedChart = 'line';
               vm.chartconfig = {
                   "labels": false,
                   "title": "",
                   "legend": {
                       "display": true,
                       "position": "right"
                   },
                   "innerRadius": 0,
                   "lineLegend": "lineEnd"
               }
               vm.q1Selected = vm.q2Selected = vm.q3Selected = vm.q4Selected = true;
               vm.selectedQuarters = ['Q1', 'Q2', 'Q3', 'Q4'];
               var dataChart = getChartData();
               vm.chartData = {
                   series: vm.selectedQuarters,
                   data: dataChart
               };
           }
           initialLoad();

           function targetInfo() {

               vm.allCompnayProfit = [];

               _.each(vm.targets, function (target) {
                   var targetData = (_.findWhere(target.financial, { year: vm.selectedYear }));

                   if (targetData) {
                       var yAxes = [];
                       if (vm.q1Selected) {
                           yAxes.push((targetData.q1.grossRevenue - targetData.q1.totalExpenses));
                       }
                       if (vm.q2Selected) {
                           yAxes.push((targetData.q2.grossRevenue - targetData.q2.totalExpenses));
                       }
                       if (vm.q3Selected) {
                           yAxes.push((targetData.q3.grossRevenue - targetData.q3.totalExpenses));
                       }
                       if (vm.q4Selected) {
                           yAxes.push((targetData.q4.grossRevenue - targetData.q4.totalExpenses));
                       }

                       vm.allCompnayProfit.push({ x: target.companyInfo.compnayName, y: yAxes })
                   }
               });
           }

           vm.changedYear = function () {
               var year = vm.selectedYear;
               var dataChart = getChartData();
               vm.chartData.data = dataChart;
           }          

           vm.quarterChecked = function () {
               
               vm.selectedQuarters = [];           
               if (vm.q1Selected) {
                   vm.selectedQuarters.push('Q1');
               }
               if (vm.q2Selected) {
                   vm.selectedQuarters.push('Q2');
               }
               if (vm.q3Selected) {
                   vm.selectedQuarters.push('Q3');
               }
               if (vm.q4Selected) {
                   vm.selectedQuarters.push('Q4');
               }
              
               vm.chartData.series = vm.selectedQuarters;
               var dataChart = getChartData();
               vm.chartData.data = dataChart;
           }
           function getChartData() {
               targetInfo();
               return vm.allCompnayProfit;
           }


       }]);

})();