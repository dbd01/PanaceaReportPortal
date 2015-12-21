"use strict";

angular.module('dbdDashboardModule').directive('dbdDashboard', function () {
    return {
        templateUrl: 'ext-modules/dbdDashboard/dbdDashboardTemplate.html',
        link: function (scope, element, attrs) {
            scope.addNewWidget = function (widget) {
                var newWidget = angular.copy(widget.settings);
                scope.widgets.push(newWidget);
            }
        }
    };
});