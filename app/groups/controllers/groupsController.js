(function(){
"use strict";

  angular.module('PanaceaReports').controller("groupsController", groupsController);
  groupsController.$inject= ['localStorageService', 'groupsService', '$scope', '$state', 'exceptionService', '$rootScope'];
  function groupsController(localStorageService, groupsService, $scope, $state, exceptionService, $rootScope ) {
    var customMessages={
      actionFailedError:{
        en:function(serviceName, actionName){
          return serviceName+" failed on action: "+actionName+".";
        },
        el:function(serviceName, actionName){
          return "H υπηρεσία "+ serviceName+" απέτυχε να εκτελέσει τη δράση: "+actionName+".";
        },
      }
    };

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
    };

    groupsService.query().$promise.then(
      function (groups) {
        populateGroupsTable(groups, function (){
          configGroupsTable(function(){
            $scope.groupsTable = groupsTable;
          });
        });
      }, function (error){
        exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]("GroupsService", "query"))(error);
      });

    function populateGroupsTable(groups, cb){
      groups.forEach(function (group) {
        var groupData = [];
        groupData.push( {"value": group._id, "showIt": true} );
        groupData.push( {"value": group.name, "showIt": true} );
        groupData.push( {"value": group.description, "showIt": true} );
        groupsTable.data.push(groupData);
      });
      cb();
    }
    function configGroupsTable(cb){
      if ($state.includes('groups.deletedGroups'))
        groupsTable.mode='deleted';
      else
        groupsTable.mode='editable';
      groupsTable.detailView='groupInfo';
      groupsTable.entity='group';
      groupsTable.entityC='Group';
      groupsTable.entityCP='Groups';
      groupsTable.ready = true;
      cb();
    }
  }
})();