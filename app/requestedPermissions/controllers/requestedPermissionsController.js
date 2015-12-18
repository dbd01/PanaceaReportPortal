
"use strict";

app.controller("requestedPermissionsController", ['requestedPermissionsService','$scope',
  function (requestedPermissionsService, $scope ) {
    var requestedPermissionsTable ={
      "header": [
        { "title": "_id",  "showIt": true },
        { "title": "name",  "showIt": true },
        { "title": "user", "showIt": true },
        { "title": "application", "showIt": true }
      ],
      "data": [],
      "ready": false
    }    

    requestedPermissionsService.query().$promise.then(
      function (requestedPermissions) {
        requestedPermissions.forEach(function (requestedPermission) {
          var requestedPermissionData = [];
          requestedPermissionData.push( {"value": requestedPermission._id, "showIt": true} );
          requestedPermissionData.push( {"value": requestedPermission.name, "showIt": true} );
          requestedPermissionData.push( {"value": requestedPermission.User.username, "showIt": true} );
          requestedPermissionData.push( {"value": requestedPermission.Application.name, "showIt": true} ); 
          requestedPermissionsTable.data.push(requestedPermissionData);
        });
      })
    .then(function () {
      $scope.requestedPermissionsTable = requestedPermissionsTable;
      $scope.requestedPermissionsTable.ready = true;
      $scope.requestedPermissionsTable.detailView='permissionInfo';
      $scope.requestedPermissionsTable.entity='requested permission';
    });
  }
]);

