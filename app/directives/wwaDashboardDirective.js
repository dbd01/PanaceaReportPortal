"use strict";

angular.module('PanaceaReports').directive('wwaDashboard', ['localStorageService', function (localStorageService) {
  return {
    scope: {
    },
    template: '<dbd-dashboard></dbd-dashboard>',
    link: function (scope) {
      scope.title="Panacea Reports Dashboard";

      scope.gridsterOpts = {
        columns: 12,
        margins: [20, 20],
        outerMargin: false,
        pushing: true,
        floating: false,
        swapping: false
      };

      scope.widgetDefinitions = [
      {
        title: 'Temperature',
        settings: {
          sizeX: 3,
          sizeY: 3,
          minSizeX: 2,
          minSizeY: 2,
          template: '<wwa-temperature></wwa-temperature>',
          widgetSettings: {
            id: 1000,
            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
            controller: 'wwaSelectLocationController'
          }
        }
      },
      {
        title: 'Inventory',
        settings: {
          sizeX: 5,
          sizeY: 3,
          minSizeX: 2,
          minSizeY: 2,
          template: '<wwa-inventory></wwa-inventory>',
          widgetSettings: {
            id: 1002,
            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
            controller: 'wwaSelectLocationController'
          }
        }
      },
      {
        title: 'Employee',
        settings: {
          sizeX: 5,
          sizeY: 3,
          minSizeX: 2,
          minSizeY: 2,
          template: '<wwa-employee></wwa-employee>',
          widgetSettings: {
            id: 5000,
            templateUrl: 'app/dialogs/wwaSelectEmployeeTemplate.html',
            controller: 'wwaSelectEmployeeController'
          }
        }
      }
      ];

      scope.widgets = localStorageService.get('widgets') || [];

      scope.$watch('widgets', function () {
        localStorageService.set('widgets', scope.widgets);
      }, true);
    }
  }
}]);