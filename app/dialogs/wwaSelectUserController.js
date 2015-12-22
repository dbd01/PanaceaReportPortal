"use strict";

angular.module('PanaceaReports').controller('wwaSelectUserController',
  ['$scope', 'usersService',
  function ($scope, usersService) {
    console.log("wwaSelectUserController");
    $scope.isLoaded = false;
    var users=usersService.query(function () {
      $scope.users = users;
      $scope.isLoaded = true;

      for (var i = 0; i < users.length; i++) {
        if (users[i]._id == $scope.item.widgetSettings.id)
          $scope.selectedUser = users[i];
      }
    });

    $scope.saveSettings = function () {
      console.log("scope.saveSettings")
      $scope.item.widgetSettings.id = $scope.selectedUser._id;
      $scope.$parent.selectedUser = $scope.selectedUser;
      $scope.$parent.ready=true;
      $scope.$close();
    };
  }]);