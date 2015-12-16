"use strict";
app.controller("userInfoController", ['usersService', 'groupsService','$scope','scopeComService',
  function ( usersService, groupsService, $scope, scopeComService ) {
    var groupsTbl ={
      "data": [],
      "ready": false
    }
    var userData = [];
    var _id=scopeComService.list[0];
    var mode=scopeComService.list[1];
    var deleted=false;
    if (scopeComService.list.length==3)
      deleted=true;
    scopeComService.flush();
    usersService.getOne({userId: _id}).$promise
    .then(function (user) {
      userData=user;
    })
    .then(function () {
      groupsService.query().$promise.then(function (groups) {
        groupsTbl.data=groups;
      })
      .then(function () {
        $scope.groupsTbl = groupsTbl;
        $scope.groupsTbl.ready = true;
      });
      scopeComService.add(mode);
      scopeComService.add(userData);
      if (deleted)
        scopeComService.add("deleted");
    });
  }
]);

