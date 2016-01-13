(function(){
"use strict";

  angular.module('dbdDashboardModule').directive('dbdWidgetBody',
    ['$compile', '$modal',
    function ($compile, $modal) {
      return {
        templateUrl: 'ext-modules/dbdDashboard/dbdWidgetBodyTemplate.html',
        link: function ($scope, element, attrs) {
          //console.log("$scope.item.template : ", $scope.item.template);
          var newElement = angular.element($scope.item.template);
          console.log("newElement : ", newElement);
          //console.log("element : ", element);
          element.append(newElement);
          $scope.ready=true;
          $compile(newElement)($scope);

          $scope.close = function () {
            $scope.widgets.splice($scope.widgets.indexOf($scope.item), 1);
          };

          $scope.settings = function () {
            var options = {
              templateUrl: $scope.item.widgetSettings.templateUrl,
              controller: $scope.item.widgetSettings.controller,
              scope: $scope
            };
            $modal.open(options);
          };

          $scope.iconClicked = function () {
            // empty body.
            // this function is used by ng-click in the template
            // so that icon clicks aren't intercepted by widgets
          };
        }
      };
    }
  ]);
})();