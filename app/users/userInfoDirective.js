"use strict";
app.directive('userinfo', [ 'localStorageService', 'usersService' ,'consoleService',  'scopeComService', '$location', '$timeout', 
  function (localStorageService, usersService, consoleService,  scopeComService, $location, $timeout) {
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
              var oTable = table.dataTable(); 
              $scope.groups =[];
              for (var i=0; i<$scope.tabledata.data.length; i++){
                $scope.groups[i] = {
                  "applications": $scope.tabledata.data[i].applications,
                  "permissions": $scope.tabledata.data[i].permissions,
                  "id": $scope.tabledata.data[i]._id,
                  "name": $scope.tabledata.data[i].name
                }
              }
              $scope.mode = scopeComService.list[0];
              if ($scope.mode=="view" || $scope.mode=="edit"){
                $scope.userData= scopeComService.list[1];
                $scope.previousData=scopeComService.list[1];
              }
              else {
                $scope.previousData=null;
              }
              scopeComService.flush();
              $scope.groupz = []; 
              $scope.groupzIDz =[];
            
              function populateDetails(){
                $scope._id= $scope.userData[0].value;
                $scope.username = $scope.userData[1].value;
                $scope.email= $scope.userData[2].value;
                $scope.confirmed= $scope.userData[3].value;
                $scope.active= $scope.userData[4].value;
                console.log("scope.userData[6].length : ", $scope.userData[6].length)
                for (var i=0; i<$scope.userData[6].length; i++){
                  $scope.groupz[i] = {
                    "id": $scope.userData[6][i]._id,
                    "name": $scope.userData[6][i].name,
                    "permissions": [],
                    "applications": []
                  }
                  for (var j=0; j<$scope.userData[6][i].permissions.length; j++){
                    $scope.groupz[i].permissions[j] = {
                      "name": $scope.userData[6][i].permissions[j].name
                    }
                  }
                  for (var j=0; j<$scope.userData[6][i].applications.length; j++){
                    $scope.groupz[i].applications[j] = {
                      "name": $scope.userData[6][i].applications[j].name
                    }
                  }
                }
              }
              if($scope.mode=="view" || $scope.mode=="edit"){
                populateDetails();
              }
              else
                $scope.name = "";

              function populateUserData(){
                $scope.userData= {
                  "_id":$scope._id,
                  "name":$scope.username,
                  "password":$scope.password,
                  "email":$scope.email,
                  "confirmed":$scope.confirmed,
                  "active":$scope.active,
                  "groups":$scope.groupz
                }
              }
              populateUserData();
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
                  $scope.groupzIDz[i] = $scope.userData.groups[i].id;
                }
                $scope.userAddData= {
                  "username": $scope.userData.name,
                  "password": $scope.userData.password,
                  "email": $scope.userData.email,
                  "groups":  $scope.groupzIDz
                }
                usersService.add($scope.userAddData, function (response) {
                  consoleService.printIt("adddddd", $scope.userAddData);
                  consoleService.printIt("User has been added successfully!");
                  $location.path('/users');
                },function (response) {
                  consoleService.printIt("errr->", $scope.userAddData);
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
                for (var i=0; i< $scope.userData.groups.length; i++)
                  $scope.groupzIDz[i] = $scope.userData.groups[i].id;
                $scope.updateData={
                  "username":$scope.userData.name,
                  "email":$scope.userData.email,
                  "confirmed": $scope.userData.confirmed,
                  "active": $scope.userData.active,
                  "groups": $scope.groupzIDz
                }
                usersService.partialUpdate({ userId: $scope._id }, $scope.updateData, function (response) {
                  consoleService.printIt("rrr", response);
                  consoleService.printIt("update data=>", $scope.updateData);
                  $location.path('/users');
                },function (response) {
                  consoleService.printIt("err update -->", $scope.updateData);
                  consoleService.printIt("er -->", response);
                  if (response.data == null){
                    consoleService.printIt("response data is null!!!!!");
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
                console.log("mode from : "+$scope.mode+" to edit")
                console.log("previousData3: ", $scope.previousData)
                $scope.mode="edit";
              }
              $scope.cancelEdit = function(){
                $location.path('/users');
              }
              $scope.cancelAdd = function(){
                $location.path('/users');
              }
              $scope.cancelUpdate = function(){
                console.log("mode from : "+$scope.mode+" to view")
                $scope.userData=$scope.previousData;
                $scope.mode="view";
                populateDetails();
                populateUserData();
              }
              $scope.previousValues=[];
            }, 0);
          }
        });
      }
    }
  }
]);