(function(){
"use strict";

  angular.module('PanaceaReports').controller("permissionInfoController", permissionInfoController);
  permissionInfoController.$inject= ['$state', 'permissionsService','$scope', 'scopeComService', '$stateParams', 'exceptionService', '$rootScope'];
  function permissionInfoController($state, permissionsService , $scope , scopeComService, $stateParams, exceptionService, $rootScope) {
    var permissionTable={
      "entity":null,
      "ready": false
    };
    var mode=$state.current.name;
    var _id=$stateParams.id;
    var newData=scopeComService.list[0]
    var newPermissionName=scopeComService.list[1];
    scopeComService.flush();

    var customMessages={
      invalidModeError:{
        en:"Non valid mode: "+mode+".",
        el:"Μη έγκυρη κατάσταση φόρμας: "+mode+"."
      },
      removeSuccess:{
        en:function(_id){
          return "Permission "+_id+" deleted.";
        },
        el:function(_id){
          return "Το δικαίωμα "+_id+" διαγράφηκε.";
        }
      },
      actionFailedError:{
        en:function(serviceName, actionName){
          return serviceName+" failed on action: "+actionName+".";
        },
        el:function(serviceName, actionName){
          return "H υπηρεσία "+ serviceName+" απέτυχε να εκτελέσει τη δράση: "+actionName+".";
        },
      }
    }

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
       addOne();
      }
    }
    else if (mode.indexOf('update')>-1){
      if (newData){
        updateOne();
      }
    }
    else{
      exceptionService.catcher(customMessages.invalidModeError[$rootScope.lang])(error);
    }

    function configPermissionTable(cb){
      permissionTable.detailView='permissionInfo';
      permissionTable.gridView='permissions';
      permissionTable.entityC='Permission';
      permissionTable.entityCP='Permissions';
      permissionTable.detailViewTemplate='app/permissions/views/permissionInfoTemplate.html';
      permissionTable.context='forms';
      permissionTable.ready = true;
      cb();
    };
    function removeOne(){
      permissionsService.remove({ id:_id }).$promise.then(
        function (response){
          console.log(response);
          alert(customMessages.removeSuccess[$rootScope.lang](_id));
          $state.go('permissions.allPermissions');
        },
        function (error) {
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('PermissionsService','removeOne'))(error);
        });
    };
    function newOne(){
      if (!newPermissionName)
        newPermissionName='';
      permissionTable.entity={
        "_id":'',
        "name":newPermissionName,
        "type":'',
        "description":'',
        "url":'',
        "model":'',
        "groups": []
      };
      configPermissionTable(function(){
        $scope.permissionTable = permissionTable;
      });
    };
    function getOne(){
      permissionsService.get({id:_id}).$promise.then(
        function (permission){
          permissionTable.entity=permission;
          configPermissionTable(function(){
            $scope.permissionTable = permissionTable;
          });
        },
        function (error){
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('PermissionsService','query'))(error);
        });
    };
    function addOne(){
      permissionsService.save(newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('permissions.allPermissions');
        },
        function (error) {
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('PermissionsService','addOne'))(error);
        });
    };
    function updateOne(){
      permissionsService.update({id: _id }, newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('permissions.allPermissions');
        },
        function (error) {
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('PermissionsService','updateOne'))(error);
        });
    };
  };
})();