"use strict";
app.directive('groupinfo', ['$state', 'localStorageService','groupsService', 'scopeComService', '$timeout',
  function ($state, localStorageService, groupsService, scopeComService, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'app/groups/views/groupInfoTemplate.html',
      scope: { 
        tableid: '@',
        tabledata: '=',
        ready: '@'
      },
      link: function ($scope) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function () {
              var table = $('#' + $scope.tableid);
              $scope.permissions =$scope.tabledata.permissions;
              $scope.mode = scopeComService.list[0];
              if ($scope.mode=="edit"){
                $scope.groupData= $scope.tabledata.group;
                $scope.previousData=$scope.tabledata.group;
              }
              else if ($scope.mode=="view"){
                $scope.groupData= $scope.tabledata.group;
                $scope.previousData=$scope.tabledata.group;;
                if (scopeComService.list.length==2)
                  $scope.deletedData=true;
                else
                  $scope.deletedData=false;
              }
              else {
                $scope.previousData=null;
                $scope.groupData={
                  "_id":'',
                  "name":'',
                  "description":'',
                  "permissions": [],
                  "applications": [],
                  "users": []
                };
              }
              
              scopeComService.flush();
              $scope.permissionzIDz =[];

              $scope.closeAlert = function() {
                $scope.alert=null;
                $scope.groupData={
                  "_id":'',
                  "name":'',
                  "description":'',
                  "permissions": [],
                  "applications": [],
                  "users": []
                };
              }
              $scope.add = function(){
                for (var i=0; i< $scope.groupData.permissions.length; i++){
                  $scope.permissionzIDz[i] = $scope.groupData.permissions[i]._id;
                }
                $scope.groupAddData={
                  "name": $scope.groupData.name,
                  "description": $scope.groupData.description ,
                  "permissions":  $scope.permissionzIDz
                }
                groupsService.add($scope.groupAddData, function (response) {
                  console.log("group has been added successfully!");
                  $state.go('groups.all');
                },function (response) {
                  console.log($scope.groupAddData);
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
                for (var i=0; i< $scope.groupData.permissions.length; i++){
                  $scope.permissionzIDz[i] = $scope.groupData.permissions[i]._id;
                }
                $scope.updateData={
                  "name":$scope.groupData.name,
                  "description":$scope.groupData.description,
                  "permissions":  $scope.permissionzIDz
                }
                groupsService.update({ groupId: $scope.groupData._id }, $scope.updateData, function (response) {
                  console.log("group has been updated successfully.");
                  console.log("update data=>", $scope.updateData);
                  $state.go('groups');
                },function (response) {
                  console.log("err update -->", $scope.updateData);
                  if (response.data == null){
                    console.log("response data is null!!!!!");
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
                    };}
                  });
              }
              $scope.edit = function(){
                console.log("mode from : "+$scope.mode+" to edit")
                $scope.mode="edit";
              }
              $scope.cancelEdit = function(){
                 if ($scope.deletedData){
                  $state.go('groups.deleted');
                }
                else{
                  $state.go('groups.all');
                }
              }
              $scope.cancelAdd = function(){
                $state.go('groups.all');
              }
              $scope.cancelUpdate = function(){
                $scope.groupData=$scope.previousData;
                $scope.mode="view";
              }
              $scope.previousValues=[];
            }, 0);
          }
        });
      }
    }
  }
]);