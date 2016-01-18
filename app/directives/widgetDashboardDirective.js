(function(){
"use strict";

  angular.module('PanaceaReports').directive('widgetDashboard', widgetDashboard);
  widgetDashboard.$inject= ['localStorageService'];
  function widgetDashboard(localStorageService) {
    return {
      scope: {
      },
      template: '<dbd-dashboard></dbd-dashboard>',
      link: function ($scope) {
        $scope.title="Panacea Reports Dashboard";

        $scope.gridsterOpts = {
          /*columns: 4,
          min_cols: 1,
          max_cols: null,
          min_rows: 15,
          max_size_x: false,
          autogenerate_stylesheet: true,
          avoid_overlapped_widgets: true,
          margins: [20, 20]*/
          columns: 6, // the width of the grid, in columns
          pushing: true, // whether to push other items out of the way on move or resize
          floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
          swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
          width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
          rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
          margins: [10, 10], // the pixel distance between each widget
          outerMargin: true, // whether margins apply to outer edges of the grid
          isMobile: false, // stacks the grid items if true
          mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
          mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
          minColumns: 1, // the minimum columns the grid must have
          minRows: 2, // the minimum height of the grid, in rows
          maxRows: 100,
          defaultSizeX: 2, // the default width of a gridster item, if not specifed
          defaultSizeY: 2, // the default height of a gridster item, if not specified
          minSizeX: 1, // minimum column width of an item
          maxSizeX: null, // maximum column width of an item
          minSizeY: 1, // minumum row height of an item
          maxSizeY: null, // maximum row height of an item
          resizable: {
             enabled: true,
             handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
             //start: function(event, $element, widget) {}, // optional callback fired when resize is started,
             //resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
             //stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
          },
          draggable: {
             enabled: true, // whether dragging items is supported
             //handle: '.my-class', // optional selector for resize handle
             //start: function(event, $element, widget) {}, // optional callback fired when drag is started,
             //drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
             //stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
          }
        };

        $scope.widgetDefinitions = [
          {
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