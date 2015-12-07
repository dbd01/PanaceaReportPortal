"use strict";
app.directive('groupinfo', [ 'localStorageService', 'consoleService', 'groupsService',  'scopeComService', '$location', '$timeout',
  function (localStorageService, consoleService, groupsService,  scopeComService, $location, $timeout) {
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
              var oTable = table.dataTable();
              console.log("oTable: ", oTable)
              $scope.permissions =[];
              for (var i=0; i<$scope.tabledata.data.length; i++){
                $scope.permissions[i] = {
                  "id":$scope.tabledata.data[i]._id,
                  "name":$scope.tabledata.data[i].name
                }
              }
              $scope.mode = scopeComService.list[0];
              if ($scope.mode=="view" || $scope.mode=="edit"){
                $scope.groupData= scopeComService.list[1];
                $scope.previousData=scopeComService.list[1];
              }
              else {
                $scope.previousData=null;
              }
              
              scopeComService.flush();
              $scope.showIt = true;
              $scope.permissionz = [];
              $scope.permissionzIDz =[];
              $scope.applicationz = [];
              $scope.userz = [];

              function populateDetails(){
                $scope._id= $scope.groupData[0].value;
                $scope.name= $scope.groupData[1].value;
                $scope.description = $scope.groupData[2].value;
                for (var i=0; i<$scope.groupData[3].length; i++){
                  $scope.permissionz[i] = {
                    "id": $scope.groupData[3][i]._id,
                    "name": $scope.groupData[3][i].name
                  }
                }
                for (var i=0; i<$scope.groupData[4].length; i++){
                  $scope.applicationz[i] = {
                    "id": $scope.groupData[4][i]._id,
                    "name": $scope.groupData[4][i].name
                  }
                }
                for (var i=0; i<$scope.groupData[5].length; i++){
                  $scope.userz[i] = {
                    "id": $scope.groupData[5][i]._id,
                    "username": $scope.groupData[5][i].username
                  }
                }
              }
              if($scope.mode=="view" || $scope.mode=="edit"){
                populateDetails();
              }
              else
                $scope.name = "";

              function populateGroupData(){
                $scope.groupData={
                  "_id": $scope._id,
                  "name": $scope.name,
                  "description": $scope.description,
                  "permissions": $scope.permissionz,
                  "applications": $scope.applicationz,
                  "users": $scope.userz
                }
              }
              populateGroupData();
              console.log("groupData: ", $scope.groupData)
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
                  $scope.permissionzIDz[i] = $scope.groupData.permissions[i].id;
                }
                $scope.groupAddData={
                  "name": $scope.groupData.name,
                  "description": $scope.groupData.description ,
                  "permissions":  $scope.permissionzIDz
                }
                groupsService.add($scope.groupAddData, function (response) {
                  consoleService.printIt("group has been added successfully!");
                  $location.path('/groups');
                },function (response) {
                  consoleService.printIt($scope.groupAddData);
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
                for (var i=0; i< $scope.groupData.permissions.length; i++){
                  $scope.permissionzIDz[i] = $scope.groupData.permissions[i].id;
                }
                $scope.updateData={
                  "name":$scope.groupData.name,
                  "description":$scope.groupData.description,
                  "permissions":  $scope.permissionzIDz
                }
                groupsService.update({ groupId: $scope._id }, $scope.updateData, function (response) {
                  consoleService.printIt("group has been updated successfully.");
                  consoleService.printIt("update data=>", $scope.updateData);
                  $location.path('/groups');
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
                    };}
                  });
              }
              $scope.edit = function(){
                console.log("mode from : "+$scope.mode+" to edit")
                console.log("previousData3: ", $scope.previousData)
                $scope.mode="edit";
              }
              $scope.cancelEdit = function(){
                $location.path('/groups');
              }
              $scope.cancelAdd = function(){
                $location.path('/groups');
              }
              $scope.cancelUpdate = function(){
                console.log("mode from : "+$scope.mode+" to view")
                $scope.groupData=$scope.previousData;
                $scope.mode="view";
                populateDetails();
                populateGroupData();
              }
              $scope.previousValues=[];
            }, 0);
          }
        });
      }
    }
  }
]);