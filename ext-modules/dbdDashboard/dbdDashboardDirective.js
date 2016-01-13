(function(){
  "use strict";

  angular.module('dbdDashboardModule').directive('dbdDashboard', function () {
    return {
      templateUrl: 'ext-modules/dbdDashboard/dbdDashboardTemplate.html',
      link: function ($scope, element, attrs) {
        $scope.addNewWidget = function (widget) {
          var newWidget = angular.copy(widget.settings);
          $scope.widgets.push(newWidget);
          /*console.log(element);
          console.log(element[0].children["gridster"]);
          var gridster=element[0].children["gridster"];
          console.log("gridster : ", gridster);
          gridster.add_widget.apply(gridster, widget);*/
        }
      }
    };
  });
})();