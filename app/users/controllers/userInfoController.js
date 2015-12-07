"use strict";
app.controller("userInfoController", ['groupsService','$scope','consoleService',
  function (groupsService, $scope, consoleService ) {
    var groupsTbl ={
      "data": [],
      "ready": false
    }
    groupsService.query().$promise.then(function (groups) {
      groupsTbl.data=groups;
    })
    .then(function () {
      $scope.groupsTbl = groupsTbl;
      $scope.groupsTbl.ready = true;
    });
  }
]);

