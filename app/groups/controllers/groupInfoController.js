"use strict";

app.controller("groupInfoController", ['$state', 'groupsService', 'permissionsService','$scope', 'scopeComService', '$stateParams',
  function ($state, groupsService, permissionsService, $scope , scopeComService, $stateParams) {
    var groupTable ={
      "entity":null,
      "permissions": [],
      "ready": false
    };
    var mode=$state.current.name;
    var _id=$stateParams.id;//scopeComService.list[0];
    var newData=scopeComService.list[0]
    scopeComService.flush();
    console.log(mode, _id, newData);
    if (mode.indexOf('remove')>-1){
      groupsService.remove({ groupId: _id }, function (response) {
        console.log("Group has been deleted successfully."); 
        $state.go('groups.allGroups')
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
        groupTable.permissions=permissions;
        groupTable.entity={
          "_id":'',
          "name":'',
          "description":'',
          "permissions": []
        };
        $scope.groupTable = groupTable
        $scope.groupTable.detailView='groupInfo';
        $scope.groupTable.gridView='groups';
        $scope.groupTable.entityC='Group';
        $scope.groupTable.entityCP='Groups';
        $scope.groupTable.detailViewTemplate='app/groups/views/groupInfoTemplate.html';
        $scope.groupTable.context='forms';
        $scope.groupTable.ready = true;
      });
    }
    else if (mode.indexOf('edit')>-1 || mode.indexOf('view')>-1 || mode.indexOf('deleted')>-1){
      var group=groupsService.getOne({groupId: _id}, function(){
        var permissions=permissionsService.query(function(){
          groupTable.entity=group;
          groupTable.permissions=permissions;
          $scope.groupTable = groupTable;
          $scope.groupTable.detailView='groupInfo';
          $scope.groupTable.gridView='groups';
          $scope.groupTable.entityC='Group';
          $scope.groupTable.entityCP='Groups';
          $scope.groupTable.detailViewTemplate='app/groups/views/groupInfoTemplate.html';
          $scope.groupTable.context='forms';
          $scope.groupTable.ready = true;
        });
      });
    }
    else if (mode.indexOf('add')>-1){
      if (newData){
        var permissionzIDz =[];
        for (var i=0; i< newData.permissions.length; i++){
          permissionzIDz[i] = newData.permissions[i]._id; 
        }
        newData.permissions=permissionzIDz;
        groupsService.add(newData, function (response) {
          console.log("Group has been added successfully!");
          $state.go('groups.allGroups');
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
        var permissionzIDz =[];
        for (var i=0; i< newData.permissions.length; i++){
          permissionzIDz[i] = newData.permissions[i]._id; 
        }
        newData.permissions=permissionzIDz;
        groupsService.update({groupId: _id }, newData, function (response) {
          console.log("Group has been updated successfully.");
          $state.go('groups.allGroups');
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
  }
]);