(function(){
"use strict";

  angular.module('PanaceaReports').controller("groupsController", groupsController);
  groupsController.$inject= ['localStorageService', 'groupsService', '$scope', '$state'];
  function groupsController(localStorageService, groupsService, $scope, $state ) {
    var groupsTable ={
      "header": [
        { "title": {en: "Id", el:"Αναγνωριστικό"},  "showIt": true },
        { "title": {en: "Name", el:"Όνομα"},  "showIt": true },
        { "title": {en: "Description", el:"Περιγραφή"}, "showIt": true }
      ],
      "headers": [
        { "title": "",  "showIt": true },
        { "title": "",  "showIt": true },
        { "title": "", "showIt": true }
      ],
      "data": [],
      "ready": false,
      "mode": ""
    }

    if ($state.includes('groups.deletedGroups'))
      groupsTable.mode='deleted';
    else
      groupsTable.mode='editable';

    groupsService.query().$promise.then(
      function (groups) {
        groups.forEach(function (group) {
          var groupData = [];
          groupData.push( {"value": group._id, "showIt": true} );
          groupData.push( {"value": group.name, "showIt": true} );
          groupData.push( {"value": group.description, "showIt": true} );
          groupsTable.data.push(groupData);
        });
      }), function(error){
        exceptionService.catcher("GroupsService query failed")(error);
      })
    .then(function () {
      $scope.groupsTable = groupsTable;
      $scope.groupsTable.ready = true;
      $scope.groupsTable.detailView='groupInfo';
      $scope.groupsTable.detailViewDeleted='groupInfodeleted';
      $scope.groupsTable.detailViewRemove='groupInfoRemove';
      $scope.groupsTable.entity='group';
      $scope.groupsTable.entityC='Group';
      $scope.groupsTable.entityCP='Groups';
    });
  };
})();