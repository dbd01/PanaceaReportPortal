(function(){
"use strict";

  angular.module('PanaceaReports').controller("groupInfoController", groupInfoController);
  groupInfoController.$inject= ['$state', 'groupsService', 'permissionsService','$scope', 'scopeComService', '$stateParams', 'exceptionService'];
  function groupInfoController($state, groupsService, permissionsService, $scope , scopeComService, $stateParams, exceptionService) {
    var groupTable ={
      "entity":null,
      "permissions": [],
      "ready": false
    };
    var mode=$state.current.name;
    var _id=$stateParams.id;//scopeComService.list[0];
    var newData=scopeComService.list[0]
    scopeComService.flush();
    
    if (mode.indexOf('remove')>-1){
      removeOne();
    }
    else if (mode.indexOf('new')>-1){
      newOne();
    }
    else if (mode.indexOf('edit')>-1 || mode.indexOf('view')>-1 || mode.indexOf('deleted')>-1){
      getOne();
    }
    else if (mode.indexOf('add')>-1){
      if (newData){
        assignPermissions(function(){
          addOne();
        });
      }
    }
    else if (mode.indexOf('update')>-1){
      if (newData){
        assignPermissions(function(){
          updateOne();
        });
      }
    }
    else{
      exceptionService.catcher("Non valid mode: "+mode+".")(error);
    }

    function configGroupTable(permissions, cb){
      groupTable.permissions=permissions;
      groupTable.detailView='groupInfo';
      groupTable.gridView='groups';
      groupTable.entityC='Group';
      groupTable.entityCP='Groups';
      groupTable.detailViewTemplate='app/groups/views/groupInfoTemplate.html';
      groupTable.context='forms';
      groupTable.ready = true;
      cb();
    }
    function assignPermissions(cb){
      var permissionzIDz =[];
      for (var i=0; i< newData.permissions.length; i++){
        permissionzIDz[i] = newData.permissions[i]._id; 
      }
      newData.permissions=permissionzIDz;
      cb();
    }
    function removeOne(){
      groupsService.remove({ id: _id }).$promise.then(
        function (response) {
          console.log("response");
          alert('Group '+_id+" deleted.");
          $state.go('groups.allGroups');
        },
        function (error) {
          exceptionService.catcher("GroupsService remove failed")(error);
        });
    };
    function newOne(){
      groupTable.entity={
        "_id":'',
        "name":'',
        "description":'',
        "permissions": []
      };
      permissionsService.query().$promise.then(
        function (permissions){
          configGroupTable(permissions, function(){
            $scope.groupTable = groupTable;
          })
          groupTable.permissions=permissions;
        },
        function (error){
          exceptionService.catcher("PermissionsService query failed")(error);
        });
    }
    function getOne(){
      groupsService.get({id:_id}).$promise.then(
        function (group){
          groupTable.entity=group;
          permissionsService.query().$promise.then(
            function (permissions){
              configGroupTable(permissions, function(){
                $scope.groupTable = groupTable;
              });
            },
            function (error){
              exceptionService.catcher("PermissionsService query failed")(error);
            });
        },
        function (error){
          exceptionService.catcher("GroupsService query failed")(error);
        });
    }
    function addOne(){
      groupsService.save(newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('groups.allGroups');
        },
        function (error) {
          exceptionService.catcher("GroupsService save failed.")(error);
        });
    }
    function updateOne(){
      groupsService.update({id: _id }, newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('groups.allGroups');
        },
        function (error) {
          exceptionService.catcher("GroupsService save failed.")(error);
        });
    }
  };
})();