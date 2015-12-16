"use strict";

app.controller("permissionInfoController", ['localStorageService', 'permissionsService','$scope', 'scopeComService','$location',
  function (localStorageService, permissionsService , $scope , scopeComService, $location ) {
    var permissionData = [];
    var _id=scopeComService.list[0];
    var mode=scopeComService.list[1];
    var deleted=false;
    if (scopeComService.list.length==3)
      deleted=true;
    scopeComService.flush();
    permissionsService.getOne({permissionId: _id}).$promise
    .then(function (permission) {
      permissionData=permission;
    })
    .then(function () {
      scopeComService.add(mode);
      scopeComService.add(permissionData);
      if (deleted)
        scopeComService.add("deleted");
    });
    $scope.mode = scopeComService.list[0];
    if ($scope.mode=="edit"){
      $scope.permissionData= scopeComService.list[1];
      $scope.previousData=scopeComService.list[1];
    }
    else if ($scope.mode=="view"){
      $scope.permissionData= scopeComService.list[1];
      $scope.previousData=scopeComService.list[1];
      if (scopeComService.list.length==3)
        $scope.deletedData=true;
      else
        $scope.deletedData=false;
    }
    else {
      if ($scope.mode=="add_requested")
        $scope.newPermissionName=scopeComService.list[1][1].value;
      $scope.previousData=null;
    }
    console.log("previous data: ", $scope.previousData);
    scopeComService.flush();
    $scope.groupz=[];
    function populateDetails(){
      $scope._id= $scope.permissionData[0].value;
      $scope.name = $scope.permissionData[1].value;
      $scope.type = $scope.permissionData[2].value;
      $scope.description= $scope.permissionData[3].value;
      $scope.url= $scope.permissionData[4].value;
      $scope.model= $scope.permissionData[5].value;
      //scope.groups must contain strings
      for (var i=0; i<$scope.permissionData[6].length; i++){
        $scope.groupz[i] = {
          "id": $scope.permissionData[6][i]._id,
          "name": $scope.permissionData[6][i].name,
          "applications": [],
          "users": []
        }
        for (var j=0; j<$scope.permissionData[6][i].applications.length; j++){
          $scope.groupz[i].applications[j] = {
            "name": $scope.permissionData[6][i].applications[j].name
          }
        }
        for (var j=0; j<$scope.permissionData[6][i].users.length; j++){
          $scope.groupz[i].users[j] = {
            "username": $scope.permissionData[6][i].users[j].username
          }
        }
      }
    }
    if($scope.mode=="view" || $scope.mode=="edit"){
      populateDetails();
    }
    else{
      if ($scope.mode=="add_requested")
        $scope.name=$scope.newPermissionName;
      else 
        $scope.name = "";
    }

    function populatePermissionData(){
      $scope.permissionData={
        "_id": $scope._id,
        "name":$scope.name,
        "type":$scope.type,
        "description": $scope.description,
        "url": $scope.url,
        "model": $scope.model,
        "groups": $scope.groupz
      }
    }
    populatePermissionData();
    $scope.closeAlert = function() {
      $scope.alert=null;
      $scope.applicationData={
        "_id":'',
        "name":'',
        "type":'',
        "description":'',
        "url":'',
        "model":'',
        "groups": []
      };
    }
    $scope.add = function(){
      $scope.permissionAddData={
        "name":$scope.permissionData.name,
        "type":$scope.permissionData.type,
        "description": $scope.permissionData.description,
        "url": $scope.permissionData.url,
        "model": $scope.permissionData.model
      }
      permissionsService.add($scope.permissionAddData, function (response) {
        consoleService.printIt("Permission has been added successfully!", response.uri);
        $location.path('/permissions');
      },function (response) {
        if (response.data == null){
          consoleService.printIt("response data is null!!!!!");
          $scope.alert = { 
            type: 'danger',
            msg: 'No response from server'
          };
        }
        else{
          consoleService.printIt("response ->", response);
          $scope.alert = {
            type: 'danger', 
            msg: response.data.message 
          };
        }
      });
    };
    $scope.update = function(){
      $scope.updateData={
       "name":$scope.permissionData.name,
        "type":$scope.permissionData.type,
        "description": $scope.permissionData.description,
        "url": $scope.permissionData.url,
        "model": $scope.permissionData.model
      }
      permissionsService.update({ permissionId: $scope._id }, $scope.updateData, function (response) {
        consoleService.printIt("Permission has been updated successfully.");
        $location.path('/permissions');
      },function (response) {
        consoleService.printIt("err update -->", $scope.updateData);
        if (response.data == null){
          consoleService.printIt("response data is null!!!!!");
          $scope.alert = {
            type: 'danger',
            msg: 'No response from server'
          };
        }
        else{
          consoleService.printIt("response ->", response);
          $scope.alert = {
            type: 'danger',
            msg: response.data.message
          };
        }
      });
    }
    $scope.edit = function(){
      console.log("mode from : "+$scope.mode+" to edit")
      $scope.mode="edit";
    }
    $scope.cancelEdit = function(){
      $location.path('/permissions');
    }
    $scope.cancelAdd = function(){
      $location.path('/permissions');
    }
    $scope.cancelUpdate = function(){
      console.log("mode from : "+$scope.mode+" to view")
      $scope.permissionData=$scope.previousData;
      $scope.mode="view";
      populateDetails();
      populatePermissionData();
    }
    console.log("permissionData: ", $scope.permissionData)
    $scope.previousValues=[];
  }
]);

