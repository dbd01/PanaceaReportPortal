(function(){
"use strict";

  angular.module('PanaceaReports').controller("userInfoController", ['$state', 'usersService', 'groupsService', 
    '$scope','scopeComService', '$timeout', '$stateParams', userInfoController]);
  function userInfoController($state, usersService, groupsService, $scope, scopeComService, $timeout, $stateParams ) {
    var userTable ={
      "entity":null,
      "groups": [],
      "ready": false
    }
    var mode=$state.current.name;
    var _id=$stateParams.id;//scopeComService.list[0];
    var newData=scopeComService.list[0];
    scopeComService.flush();
    console.log(mode, _id, newData);
    if (mode.indexOf('remove')>-1){
      usersService.remove({ 'userId': _id }, function (response) {
        console.log("User has been deleted successfully."); 
        $state.go('users.allUsers')
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
      var groups=groupsService.query(function(){
        userTable.groups=groups;
        userTable.entity={
          "_id":'',
          "username":'',
          "email":'',
          "confirmed":'',
          "active":'',
          "groups": []
        };
        $scope.userTable = userTable
        $scope.userTable.detailView='userInfo';
        $scope.userTable.gridView='users';
        $scope.userTable.entityC='User';
        $scope.userTable.entityCP='Users';
        $scope.userTable.detailViewTemplate='app/users/views/userInfoTemplate.html';
        $scope.userTable.context='forms';
        $scope.userTable.ready = true;
      });
    }
    else if (mode.indexOf('edit')>-1 || mode.indexOf('view')>-1 || mode.indexOf('deleted')>-1){
      var user=usersService.getOne({'userId': _id}, function(){
        var groups=groupsService.query(function(){
          userTable.entity=user;
          userTable.groups=groups;
          $scope.userTable = userTable
          $scope.userTable.detailView='userInfo';
          $scope.userTable.gridView='users';
          $scope.userTable.entityC='User';
          $scope.userTable.entityCP='Users';
          $scope.userTable.detailViewTemplate='app/users/views/userInfoTemplate.html';
          $scope.userTable.context='forms';
          $scope.userTable.ready = true;
        });
      });
    }
    else if (mode.indexOf('add')>-1){
      if (newData){
        var groupzIDz =[];
        for (var i=0; i< newData.groups.length; i++){
          groupzIDz[i] = newData.groups[i]._id; 
        }
        newData.groups=groupzIDz;
        usersService.add(newData, function (response) {
          console.log("User has been added successfully!");
          $state.go('users.allUsers');
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
        var groupzIDz =[];
        for (var i=0; i< newData.groups.length; i++){
          groupzIDz[i] = newData.groups[i]._id; 
        }
        newData.groups=groupzIDz;
        usersService.partialUpdate({'userId': _id }, newData, function (response) {
          console.log("User has been updated successfully.");
          $state.go('users.allUsers');
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