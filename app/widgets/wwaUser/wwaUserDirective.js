"use strict";

angular.module('PanaceaReports').directive('wwaUser',
  ['usersService',
  function (usersService) {
    return {
      templateUrl: 'app/users/views/usersView.html',
      link: function (scope, el, attrs) {
        scope.selectedUser = null;
        console.log("scope.item.widgetSettings.id: ", scope.item.widgetSettings.id);
        var user=usersService.getOne({ "userId": scope.item.widgetSettings.id}, function () {
          scope.selectedUser = user;
        });
      }
    };
  }]);