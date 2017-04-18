(function () {

    angular.module("ePlayBook")
       .controller("PerformanceCtrl", ["targetService", "$stateParams", function (targetService, $stateParams) {
           var vm = this;         

           function initialLoad() {
               vm.target = targetService.getTarget($stateParams.id);
               vm.currentTargetFinancialData = vm.target.financial[0];
               vm.selectedYear = vm.currentTargetFinancialData;

               vm.barconfig = {
                   title: 'Financial Performance by Quarter',
                   tooltips: true,
                   labels: false,
                   mouseover: function () { },
                   mouseout: function () { },
                   click: function () { },
                   legend: {
                       display: true,
                       position: 'right'
                   }
               };

               vm.pieconfig = {
                   title: 'Financial Performance by Year',
                   tooltips: true,
                   labels: false,
                   mouseover: function () { },
                   mouseout: function () { },
                   click: function () { },
                   legend: {
                       display: true,
                       position: 'right'
                   }
               };

               var dataBarChart = initialBarChart();
               vm.bardata = {
                   series: ['Gross Revenue', 'Total Expense', 'Profit'],
                   data: dataBarChart
               };

               var dataPieChart = initialPieChart();
               vm.piedata = {
                   series: ['Gross Revenue', 'Total Expense', 'Profit'],
                   data: dataPieChart
               };
           }
           initialLoad();

           vm.changedYear = function () {
               
               var year = vm.selectedYear.year;
               vm.currentTargetFinancialData = _.findWhere(vm.target.financial, { year: parseInt(year) });

               var dataChart = initialBarChart();

               vm.bardata.data = dataChart;

               var dataPieChart = initialPieChart();

               vm.piedata.data = dataPieChart;

           }

           function initialBarChart() {
               //set value for chart
               return [{
                   x: "Quarter 1",
                   y: [vm.currentTargetFinancialData.q1.grossRevenue, vm.currentTargetFinancialData.q1.totalExpenses, (vm.currentTargetFinancialData.q1.grossRevenue - vm.currentTargetFinancialData.q1.totalExpenses)]
                  },
                  {
                      x: "Quarter 2",
                      y: [vm.currentTargetFinancialData.q2.grossRevenue, vm.currentTargetFinancialData.q2.totalExpenses, (vm.currentTargetFinancialData.q2.grossRevenue - vm.currentTargetFinancialData.q2.totalExpenses)]
                  },
                  {
                      x: "Quarter 3",
                      y: [vm.currentTargetFinancialData.q3.grossRevenue, vm.currentTargetFinancialData.q3.totalExpenses, (vm.currentTargetFinancialData.q3.grossRevenue - vm.currentTargetFinancialData.q3.totalExpenses)]
                  },
                  {
                      x: "Quarter 4",
                      y: [vm.currentTargetFinancialData.q4.grossRevenue, vm.currentTargetFinancialData.q4.totalExpenses, (vm.currentTargetFinancialData.q4.grossRevenue - vm.currentTargetFinancialData.q4.totalExpenses)]
                  }]
           }

           function initialPieChart() {
               return [{
                   x: "Gross Revenue",
                   y: [vm.currentTargetFinancialData.q1.grossRevenue + vm.currentTargetFinancialData.q2.grossRevenue + vm.currentTargetFinancialData.q3.grossRevenue + vm.currentTargetFinancialData.q4.grossRevenue]
                  },
                  {
                      x: "Total Expense",
                      y: [vm.currentTargetFinancialData.q1.totalExpenses + vm.currentTargetFinancialData.q2.totalExpenses + vm.currentTargetFinancialData.q3.totalExpenses + vm.currentTargetFinancialData.q4.totalExpenses]
                  },
                  {
                      x: "Profit",
                      y: [(vm.currentTargetFinancialData.q1.grossRevenue + vm.currentTargetFinancialData.q2.grossRevenue + vm.currentTargetFinancialData.q3.grossRevenue + vm.currentTargetFinancialData.q4.grossRevenue) - (vm.currentTargetFinancialData.q1.totalExpenses + vm.currentTargetFinancialData.q2.totalExpenses + vm.currentTargetFinancialData.q3.totalExpenses + vm.currentTargetFinancialData.q4.totalExpenses)]
                  }
               ]
           }

       }]);
})();