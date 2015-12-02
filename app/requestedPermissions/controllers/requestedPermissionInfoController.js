
"use strict";

app.controller("requestedPermissionInfoController", ['localStorageService', 'consoleService','requestedPermissionsService','$scope', 'scopeComService','$location',
  function (localStorageService, consoleService, requestedPermissionsService , $scope , scopeComService, $location ) {
    $scope.requestedPermissionData= scopeComService.list[0];
    scopeComService.flush();
    $scope.showIt = true;

    if ($scope.requestedPermissionData=="add_new_requestedPermission")
      $scope.showIt = false;
    if($scope.showIt){
      $scope._id= $scope.requestedPermissionData[0].value;
      $scope.name= $scope.requestedPermissionData[1].value;
      $scope.user = $scope.requestedPermissionData[2].value;
      $scope.application= $scope.requestedPermissionData[3].value; 
    }
    else 
      $scope._id = "";

    $scope.closeAlert = function() {
      $scope.alert=null;
      $scope.requestedPermissionData={
        "_id":'',
        "name":'',
        "user":'',
        "application":''
      };
    }    

    $scope.requestedPermissionData={ 
      "_id": $scope._id,
      "name": $scope.name,
      "user": $scope.user,
      "application": $scope.application
    }
  }
]);

