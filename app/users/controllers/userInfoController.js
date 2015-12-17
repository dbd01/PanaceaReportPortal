"use strict";
app.controller("userInfoController", ['$state', 'usersService', 'groupsService','$scope','scopeComService',
  function ($state, usersService, groupsService, $scope, scopeComService ) {
    var userTable ={
      "user":null,
      "groups": [],
      "ready": false
    }
    var mode=scopeComService.list[0];
    var _id=scopeComService.list[1];
    var deleted=false;
    if (scopeComService.list.length==3)
      deleted=true;
    scopeComService.flush();
    if (mode=='remove'){
      usersService.remove({ userId: _id }, function (response) {
        console.log("Usern has been deleted successfully."); 
        $state.go('users.all')
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
      var groups=groupsService.query(function(){
        userTable.groups=groups;
        $scope.userTable = userTable
        scopeComService.add(mode);
        $scope.userTable.ready = true;
      });
    }
    else{
      var user=usersService.getOne({userId: _id}, function(){
        var groups=groupsService.query(function(){
          userTable.user=user;
          userTable.groups=groups;
          $scope.userTable = userTable
          scopeComService.add(mode);
          if (deleted)
            scopeComService.add("deleted");
          //$scope.ready=true;
          $scope.userTable.ready = true;
        });
      });
    }
  }]);

