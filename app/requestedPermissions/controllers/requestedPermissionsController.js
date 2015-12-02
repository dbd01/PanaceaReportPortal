
"use strict";

app.controller("requestedPermissionsController", ['localStorageService', 'consoleService','requestedPermissionsService','$scope',
  function (localStorageService, consoleService, requestedPermissionsService, $scope ) {
    var authData = localStorageService.get('authorizationData');
    consoleService.printIt("auth data--pp>", authData);	

    var requestedPermissionsTable ={
      "header": [
        { "title": "_id",  "showIt": true },
        { "title": "name",  "showIt": true },
        { "title": "userId", "showIt": true },
        { "title": "applicationId", "showIt": true }
      ],
      "data": [],
      "ready": false
    }    

    requestedPermissionsService.query().$promise.then(
      function (requestedPermissions) {
        consoleService.printIt("groups:=>",requestedPermissions);
        requestedPermissions.forEach(function (requestedPermission) {
          var requestedPermissionData = [];
          requestedPermissionData.push( {"value": requestedPermission._id, "showIt": true} );
          requestedPermissionData.push( {"value": requestedPermission.name, "showIt": true} );
          requestedPermissionData.push( {"value": requestedPermission.userId, "showIt": true} );
          requestedPermissionData.push( {"value": requestedPermission.applicationId, "showIt": true} ); 
          requestedPermissionsTable.data.push(requestedPermissionData);                 
        });
      })    
    .then(function () {
      $scope.requestedPermissionsTable = requestedPermissionsTable;
      $scope.requestedPermissionsTable.ready = true;
      consoleService.printIt("ppp", $scope.requestedPermissionsTable.data);
    });
  }
]);

