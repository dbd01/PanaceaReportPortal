"use strict";

app.controller("groupsController", ['localStorageService','groupsService','$scope', '$state',
  function (localStorageService, groupsService, $scope, $state ) {
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
      if ($state.includes('groups.deletedGroups'))
        $scope.groupsTable.mode='deleted';
      else
        $scope.groupsTable.mode='editable';
      $scope.groupsTable.detailView='groupInfo';
      $scope.groupsTable.detailViewDeleted='groupInfodeleted';
      $scope.groupsTable.detailViewRemove='groupInfoRemove';
      $scope.groupsTable.entity='group';
      $scope.groupsTable.entityC='Group';
      $scope.groupsTable.entityCP='Groups';
    });
}]);

