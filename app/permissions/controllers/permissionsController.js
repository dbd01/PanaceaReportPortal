"use strict";

app.controller("permissionsController", ['localStorageService', 'consoleService','permissionsService','$scope', '$state',
  function (localStorageService, consoleService, permissionsService, $scope, $state ) {
    var authData = localStorageService.get('authorizationData');
    consoleService.printIt("auth data--pp>", authData);
    var permissionsTable ={
      "header": [
        { "title": "_id",  "showIt": true },
        { "title": "name",  "showIt": true },
        { "title": "type", "showIt": true },
        { "title": "description", "showIt": true },
        { "title": "url", "showIt": true },
        { "title": "model", "showIt": true }
      ],
  		"data": [],
  		"ready": false,
      "mode": ""
    }
    permissionsService.query().$promise.then(
      function (permissions) {
        consoleService.printIt("groups:=>",permissions);
        permissions.forEach(function (permission) {
          var permissionData = [];
          permissionData.push( {"value": permission._id, "showIt": true} );
          permissionData.push( {"value": permission.name, "showIt": true} );
          permissionData.push( {"value": permission.type, "showIt": true} );
          permissionData.push( {"value": permission.url, "showIt": true} ); 
          permissionData.push( {"value": permission.description, "showIt": true} );
          permissionData.push( {"value": permission.model, "showIt": true} );
          permissionsTable.data.push(permissionData);
        });
      }).then(function () {
        $scope.permissionsTable = permissionsTable;
        $scope.permissionsTable.ready = true;
        if ($state.includes('lala.permissionsDeleted'))
          $scope.permissionsTable.mode='deleted';
        else
          $scope.permissionsTable.mode='editable';
      }
    );
  }
]);

