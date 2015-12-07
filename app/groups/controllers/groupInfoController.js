"use strict";

app.controller("groupInfoController", ['permissionsService', 'consoleService', '$scope',
  function ( permissionsService, consoleService, $scope ) {
    var permissionsTbl ={
      "data": [],
      "ready": false
    }
    permissionsService.query().$promise.then(function (permissions) {
      permissionsTbl.data=permissions;
    }).then(function () {
      $scope.permissionsTbl = permissionsTbl;
      $scope.permissionsTbl.ready = true;
    });
  }
]);

