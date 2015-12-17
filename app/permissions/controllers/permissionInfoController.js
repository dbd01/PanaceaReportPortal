"use strict";

app.controller("permissionInfoController", ['$state', 'localStorageService', 'permissionsService','$scope', 'scopeComService', '$timeout',
  function ($state, localStorageService, permissionsService , $scope , scopeComService, $timeout) {
    var permissionTable={
      "permission":null,
      "ready": false
    };
    var mode=scopeComService.list[0];
    var _id=scopeComService.list[1];
    var deleted=false;
    if (scopeComService.list.length==3)
      deleted=true;
    scopeComService.flush();
    if (mode=='remove'){
      permissionsService.remove({ permissionId: _id }, function (response) {
        console.log("Permission has been deleted successfully."); 
        $state.go('permissions.all')
      },function (response) {
        if (response.data == null){
          console.log("response  data is null! -(0)");
        }
        else{
          console.log("response (0) ->", response);
        }
      });
    }
    else if (mode=='add'){
      scopeComService.add(mode);
      $scope.ready = true;
    }
    else{
      var permission=permissionsService.getOne({permissionId: _id}, function(){
        permissionTable.permission=permission;
        $scope.permissionTable = permissionTable
        scopeComService.add(mode);
        if (deleted)
          scopeComService.add("deleted");
        $scope.ready = true;
      });
    }

    $scope.$watch('ready', function (newvalue, oldvalue) {
      if (newvalue==true) {
        $timeout(function(){
          $scope.mode = scopeComService.list[0];
          console.log("mode: ", $scope.mode)
          console.log("mode: ", scopeComService.list)
          if ($scope.mode=="edit"){
            $scope.permissionData=$scope.permissionTable.permission
            $scope.previousData=$scope.permissionTable.permission
          }
          else if ($scope.mode=="view"){
            $scope.permissionData=$scope.permissionTable.permission
            $scope.previousData=$scope.permissionTable.permission
            if (scopeComService.list.length==2)
              $scope.deletedData=true;
            else
              $scope.deletedData=false;
          }
          else {
            $scope.newPermissionName='';
            if ($scope.mode=="add_requested")
              $scope.newPermissionName=scopeComService.list[1][1].value;
            $scope.previousData=null;
            $scope.permissionData={
              "_id":'',
              "name":$scope.newPermissionName,
              "type":'',
              "description":'',
              "url":'',
              "model":'',
              "groups": []
            };
          }
          scopeComService.flush();

          $scope.closeAlert = function() {
            $scope.alert=null;
            $scope.permissionData={
              "_id":'',
              "name":'',
              "type":'',
              "description":'',
              "url":'',
              "model":'',
              "groups": []
            };
          };
          $scope.add = function(){
            $scope.permissionAddData={
              "name":$scope.permissionData.name,
              "type":$scope.permissionData.type,
              "description": $scope.permissionData.description,
              "url": $scope.permissionData.url,
              "model": $scope.permissionData.model
            }
            permissionsService.add($scope.permissionAddData, function (response) {
              console.log("Permission has been added successfully!", response.uri);
              $state.go('permissions.all');
            },function (response) {
              if (response.data == null){
                console.log("response data is null!!!!!");
                $scope.alert = { 
                  type: 'danger',
                  msg: 'No response from server'
                };
              }
              else{
                console.log("response ->", response);
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
            permissionsService.update({ permissionId: $scope.permissionData._id }, $scope.updateData, function (response) {
              console.log("Permission has been updated successfully.");
              $state.go('permissions.all');
            },function (response) {
              if (response.data == null){
                console.log("response data is null!!!!!");
                $scope.alert = {
                  type: 'danger',
                  msg: 'No response from server'
                };
              }
              else{
                console.log("response ->", response);
                $scope.alert = {
                  type: 'danger',
                  msg: response.data.message
                };
              }
            });
          };
          $scope.edit = function(){
            console.log("mode from : "+$scope.mode+" to edit")
            $scope.mode="edit";
          };
          $scope.cancelEdit = function(){
            if ($scope.deletedData){
              $state.go('permissions.deleted');
            }
            else{
              $state.go('permissions.all');
            }
          };
          $scope.cancelAdd = function(){
            $state.go('permissions.all');
          };
          $scope.cancelUpdate = function(){
            console.log("mode from : "+$scope.mode+" to view")
            $scope.permissionData=$scope.previousData;
            $scope.mode="view";
          };
          $scope.previousValues=[];
        },0);
      }
    });
  }]);

