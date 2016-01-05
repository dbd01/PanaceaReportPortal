"use strict";

angular.module('PanaceaReports').directive('widgetDashboard', ['localStorageService', function (localStorageService) {
  return {
    scope: {
    },
    template: '<dbd-dashboard></dbd-dashboard>',
    link: function ($scope) {
      console.log("widgetDashboardDirective");
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
            sizeX: 7,
            sizeY: 7,
            minSizeX: 7,
            minSizeY: 7,
            template: '<widget-user></widget-user>',
            widgetSettings: {
              id: null,//default userId
              templateUrl: 'ext-modules/widgets/widgetUser/dialogs/widgetSelectUserTemplate.html',
              controller: 'widgetSelectUserController'
            }
          }
        }/*,
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
        }*/
      ];

      $scope.widgets = localStorageService.get('widgets') || [];

      console.log("widgetDashboardDirective : widgets: ", $scope.widgets);

      $scope.$watch('widgets', function () {
        console.log("widgetDashboardDirective : watch: widgets");
        localStorageService.set('widgets', $scope.widgets);
      }, true);
    }
  }
}]);