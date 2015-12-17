"use strict";

app.controller("groupsController", ['localStorageService', 'consoleService' ,'groupsService','$scope', '$state',
  function (localStorageService, consoleService, groupsService, $scope, $state ) {
    var authData = localStorageService.get('authorizationData');
    consoleService.printIt("auth data--gg>", authData);
    var groupsTable ={
      "header": [
        { "title": "_id",  "showIt": true },
        { "title": "name",  "showIt": true },
        { "title": "description", "showIt": true }
      ],
      "data": [],
      "ready": false,
      "mode": ""
    }
    groupsService.query().$promise
    .then(function (groups) {
      consoleService.printIt("groups:=>",groups);
      groups.forEach(function (group) {
        var groupData = [];
        groupData.push( {"value": group._id, "showIt": true} );
        groupData.push( {"value": group.name, "showIt": true} );
        groupData.push( {"value": group.description, "showIt": true} );
        groupsTable.data.push(groupData);
      });
    })
    .then(function () {
      $scope.groupsTable = groupsTable;
      $scope.groupsTable.ready = true;
      if ($state.includes('groups.deleted'))
        $scope.groupsTable.mode='deleted';
      else
        $scope.groupsTable.mode='editable';
      $scope.groupsTable.detailView='groupInfo';
      $scope.groupsTable.detailViewDeleted='groupInfodeleted';
      $scope.groupsTable.detailViewRemove='groupInfoRemove';
      $scope.groupsTable.entity='group';
    });
}]);

