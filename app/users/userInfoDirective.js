"use strict";
app.directive('userinfo', ['$state', 'localStorageService', 'usersService' , 'scopeComService', '$timeout', 
  function ($state, localStorageService, usersService,  scopeComService, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'app/users/views/userInfoTemplate.html',
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
              $scope.groups =$scope.tabledata.groups;
              $scope.mode = scopeComService.list[0];
              if ($scope.mode=="edit"){
                $scope.userData= $scope.tabledata.user;
                $scope.previousData=$scope.tabledata.user;
              }
              else if ($scope.mode=="view"){
                $scope.userData= $scope.tabledata.user;
                $scope.previousData=$scope.tabledata.user;
                if (scopeComService.list.length==2)
                  $scope.deletedData=true;
                else
                  $scope.deletedData=false;
              }
              else {
                $scope.previousData=null;
                $scope.userData={
                  "_id":'',
                  "username":'',
                  "password":'',
                  "email":'',
                  "confirmed":'',
                  "active":'',
                  "groups": []
                };
              }
              scopeComService.flush();

              $scope.groupzIDz =[];
              $scope.closeAlert = function() {
                $scope.alert=null;
                $scope.userData={
                  "_id":'',
                  "name":'',
                  "password":'',
                  "email":'',
                  "confirmed":'',
                  "active":'',
                  "groups": []
                };
              }
              $scope.add = function(){
                for (var i=0; i< $scope.userData.groups.length; i++){
                  $scope.groupzIDz[i] = $scope.userData.groups[i]._id;
                }
                $scope.userAddData= {
                  "username": $scope.userData.username,
                  "password": $scope.userData.password,
                  "email": $scope.userData.email,
                  "groups":  $scope.groupzIDz
                }
                usersService.add($scope.userAddData, function (response) {
                  console.log("User has been added successfully!");
                  $state.go('users.all');
                },function (response) {
                  console.log("errr->", $scope.userAddData);
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
                for (var i=0; i< $scope.userData.groups.length; i++){
                  $scope.groupzIDz[i] = $scope.userData.groups[i].id;
                }
                $scope.updateData={
                  "username":$scope.userData.name,
                  "email":$scope.userData.email,
                  "confirmed": $scope.userData.confirmed,
                  "active": $scope.userData.active,
                  "groups": $scope.groupzIDz
                }
                usersService.partialUpdate({ userId: $scope.userData._id }, $scope.updateData, function (response) {
                  console.log("User has been updated successfully.");
                  consoleService.printIt("update data=>", $scope.updateData);
                  $state.go('users.all');
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
                    $scope.alert = {
                      type: 'danger',
                      msg: response.data.message
                    };
                  }
                });
              }
              $scope.edit = function(){
                console.log("mode from : "+$scope.mode+" to edit");
                $scope.mode="edit";
              }
              $scope.cancelEdit = function(){
                if ($scope.deletedData){
                  $state.go('users.deleted');
                }
                else{
                  $state.go('users.all');
                }
              }
              $scope.cancelAdd = function(){
                $state.go('users.all');
              }
              $scope.cancelUpdate = function(){
                $scope.userData=$scope.previousData;
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