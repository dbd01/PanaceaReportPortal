"use strict";

angular.module('PanaceaReports').directive('wwaDashboard', ['localStorageService', function (localStorageService) {
  return {
    scope: {
    },
    template: '<dbd-dashboard></dbd-dashboard>',
    link: function ($scope) {
      $scope.title="Panacea Reports Dashboard";

      $scope.gridsterOpts = {
        columns: 12,
        margins: [20, 20],
        outerMargin: false,
        pushing: true,
        floating: false,
        swapping: false
      };

      $scope.widgetDefinitions = [
        {
          title: 'User',
          settings: {
            sizeX: 5,
            sizeY: 3,
            minSizeX: 2,
            minSizeY: 2,
            template: '<wwa-user></wwa-user>',
            widgetSettings: {
              id: 1,
              templateUrl: 'app/dialogs/wwaSelectUserTemplate.html',
              controller: 'wwaSelectUserController'
            }
          }
        }
      ];

      $scope.widgets = localStorageService.get('widgets') || [];

      $scope.$watch('widgets', function () {
        localStorageService.set('widgets', $scope.widgets);
      }, true);
    }
  }
}]);