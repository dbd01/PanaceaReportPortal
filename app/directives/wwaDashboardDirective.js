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
          title: 'Application',
          settings: {
            sizeX: 3,
            sizeY: 3,
            minSizeX: 2,
            minSizeY: 2,
            template: '<wwa-application></wwa-application>',
            widgetSettings: {
              id: 1000,
              templateUrl: 'app/dialogs/wwaSelectGroupTemplate.html',
              controller: 'wwaSelectGroupController'
            }
          }
        },
        {
          title: 'Group',
          settings: {
            sizeX: 5,
            sizeY: 3,
            minSizeX: 2,
            minSizeY: 2,
            template: '<wwa-group></wwa-group>',
            widgetSettings: {
              id: 1002,
              templateUrl: 'app/dialogs/wwaSelectGroupTemplate.html',
              controller: 'wwaSelectGroupController'
            }
          }
        },
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