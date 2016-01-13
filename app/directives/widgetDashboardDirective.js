(function(){
"use strict";

  angular.module('PanaceaReports').directive('widgetDashboard', ['localStorageService', widgetDashboard]);
  function widgetDashboard(localStorageService) {
    return {
      scope: {
      },
      template: '<dbd-dashboard></dbd-dashboard>',
      link: function ($scope) {
        console.log("widgetDashboardDirective");
        $scope.title="Panacea Reports Dashboard";

        $scope.gridsterOpts = {
          columns: 4,
          min_cols: 1,
          max_cols: null,
          min_rows: 15,
          max_size_x: false,
          autogenerate_stylesheet: true,
          avoid_overlapped_widgets: true,
          margins: [20, 20]
        };

        $scope.widgetDefinitions = [
          {
            sizeX: 1,
            sizeY: 4,
            minSizeX: 1,
            minSizeY: 4,
            title: 'User',
            settings: {
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

        $scope.$watch('widgets', function () {
          localStorageService.set('widgets', $scope.widgets);
        }, true);
      }
    }
  };
})();