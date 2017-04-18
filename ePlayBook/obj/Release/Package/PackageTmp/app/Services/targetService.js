
(function () {
    'use strict';
    angular.module("ePlayBook")
  .factory("targetService", ["baseSvc", function (baseSvc) {

      var targetData = [];

      function initialLoad() {
          var query = 'app/services/targets.json';
          return baseSvc.getRequest(query).then(function (response) {
              targetData = response;
          });
      }

      function getData() {
          return targetData;
      }

      function add(target) {
          var maxid = _.max(targetData, function (target) { return target.id; }).id;
          target.id = maxid+1;
          targetData.push(target);
      }

      function update(target) {
          _.extend(_.findWhere(targetData, { id: parseInt(target.id) }), target);
      }

      function remove(id)
      {
          targetData = _.without(targetData, _.findWhere(targetData, {
              id: parseInt(id)
          }));
      }

      function getTarget(id)
      {
          var data =  _.findWhere(targetData, {
              id: parseInt(id)
          });

          return angular.copy(data);
      }
      function getTargetByTitle(companyName)
      {          
          var data = _.find(targetData, function (target) {
             
              return target.companyInfo.compnayName == companyName;
          });
          return data;
      }
      return {
          getData: getData,
          initialLoad: initialLoad,
          add: add,
          remove: remove,
          getTarget: getTarget,
          getTargetByTitle:getTargetByTitle,
          update:update
      };
  }]);

})();