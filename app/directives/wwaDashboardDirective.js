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
            sizeX: 4,
            sizeY: 5,
            minSizeX: 4,
            minSizeY: 5,
            template: '<wwa-user></wwa-user>',
            widgetSettings: {
              id: null,//default userId
              templateUrl: 'app/dialogs/wwaSelectUserTemplate.html',
              controller: 'wwaSelectUserController'
            }
          }
        },
        {
          title: 'Application',
          settings: {
            sizeX: 7,
            sizeY: 5,
            minSizeX: 7,
            minSizeY: 5,
            template: '<wwa-application></wwa-application>',
            widgetSettings: {
              id: null,//default applicationId
              templateUrl: 'app/dialogs/wwaSelectApplicationTemplate.html',
              controller: 'wwaSelectApplicationController'
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