"use strict";

app.controller("groupInfoController", ['groupsService', 'permissionsService', '$scope', 'scopeComService',
  function (groupsService, permissionsService, $scope , scopeComService) {
    var permissionsTbl ={
      "data": [],
      "ready": false
    }
    var groupData = [];
    var _id=scopeComService.list[0];
    var mode=scopeComService.list[1];
    var deleted=false;
    if (scopeComService.list.length==3)
      deleted=true;
    scopeComService.flush();
    groupsService.getOne({groupId: _id}).$promise
    .then(function (group) {
     groupData=group;
    })
    .then(function () {
      permissionsService.query().$promise.then(function (permissions) {
        permissionsTbl.data=permissions;
      }).then(function () {
        $scope.permissionsTbl = permissionsTbl;
        $scope.permissionsTbl.ready = true;
      });
      scopeComService.add(mode);
      scopeComService.add(groupData);
      if (deleted)
        scopeComService.add("deleted");
    });
  }
]);

