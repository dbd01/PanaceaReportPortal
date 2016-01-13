(function(){
"use strict";

  angular.module('PanaceaReports').controller("permissionInfoController", ['$state', 'permissionsService',
    '$scope', 'scopeComService', '$stateParams', permissionInfoController]);
  function permissionInfoController($state, permissionsService , $scope , scopeComService, $stateParams) {
    var permissionTable={
      "entity":null,
      "ready": false
    };
    var mode=$state.current.name;
    var _id=$stateParams.id;//scopeComService.list[0];
    var newData=scopeComService.list[0]
    var newPermissionName=scopeComService.list[1];
    scopeComService.flush();
    console.log(mode, _id, newData);
    if (mode.indexOf('remove')>-1){
      permissionsService.remove({ permissionId: _id }, function (response) {
        console.log("Permission has been deleted successfully."); 
        $state.go('permissions.allPermissions')
      },function (response) {
        if (response.data == null){
          console.log("response  data is null! -(0)");
        }
        else{
          console.log("response (0) ->", response);
        }
      });
    }
    else if (mode.indexOf('new')>-1){
      var permissions=permissionsService.query(function(){
        if (!newPermissionName)
          newPermissionName='';
        permissionTable.entity={
          "_id":'',
          "name":newPermissionName,
          "type":'',
          "description":'',
          "url":'',
          "model":'',
          "groups": []
        };
        $scope.permissionTable = permissionTable
        $scope.permissionTable.detailView='permissionInfo';
        $scope.permissionTable.gridView='permissions';
        $scope.permissionTable.entityC='Permission';
        $scope.permissionTable.entityCP='Permissions';
        $scope.permissionTable.detailViewTemplate='app/permissions/views/permissionInfoTemplate.html';
        $scope.permissionTable.context='forms';
        $scope.permissionTable.ready = true;
      });
    }
    else if (mode.indexOf('edit')>-1 || mode.indexOf('view')>-1 || mode.indexOf('deleted')>-1){
      var permission=permissionsService.getOne({permissionId: _id}, function(){
        permissionTable.entity=permission;
        $scope.permissionTable = permissionTable
        $scope.permissionTable.detailView='permissionInfo';
        $scope.permissionTable.gridView='permissions';
        $scope.permissionTable.entityC='Permission';
        $scope.permissionTable.entityCP='Permissions';
        $scope.permissionTable.detailViewTemplate='app/permissions/views/permissionInfoTemplate.html';
        $scope.permissionTable.context='forms';
        $scope.permissionTable.ready = true;
      });
    }
    else if (mode.indexOf('add')>-1){
      if (newData){
        permissionsService.add(newData, function (response) {
          console.log("Permission has been added successfully!");
          $state.go('permissions.allPermissions');
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
      }
    }
    else if (mode.indexOf('update')>-1){
      if (newData){
        permissionsService.update({permissionId: _id }, newData, function (response) {
          console.log("Permission has been updated successfully.");
          $state.go('permissions.allPermissions');
        },function (response) {
          if (response.data == null){
            console.log("response data is null!!!!!");
            $scope.alert = {
              type: 'danger',
              msg: 'No response from server'
            };
          }
          else{
            $scope.alert = {
              type: 'danger',
              msg: response.data.message
            };
          }
        });
      }
    }
    else{
      //error
    }
  };
})();