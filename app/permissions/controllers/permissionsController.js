(function(){
"use strict";

  angular.module('PanaceaReports').controller("permissionsController", permissionsController);
  permissionsController.$inject= ['localStorageService', 'permissionsService', '$scope', '$state', 'exceptionService'];
  function permissionsController(localStorageService, permissionsService, $scope, $state, exceptionService ) {
    var permissionsTable ={
      "header": [
        { "title": {en: "Id", el:"Αναγνωριστικό"},  "showIt": true },
        { "title": {en: "Name", el:"Όνομα"},  "showIt": true },
        { "title": {en: "Type", el:"Τύπος"}, "showIt": true },
        { "title": {en: "Description", el:"Περιγραφή"}, "showIt": true },
        { "title": {en: "Url", el:"Url"}, "showIt": true },
        { "title": {en: "Model", el:"Μοντέλο"}, "showIt": true }
      ],
      "headers": [
        { "title": "",  "showIt": true },
        { "title": "",  "showIt": true },
        { "title": "", "showIt": true },
        { "title": "", "showIt": true },
        { "title": "", "showIt": true },
        { "title": "", "showIt": true }
      ],
      "data": [],
      "ready": false,
      "mode": ""
    }

    if ($state.includes('permissions.deletedPermissions'))
      permissionsTable.mode='deleted';
    else
      permissionsTable.mode='editable';

    permissionsService.query().$promise.then(
      function (permissions) {
        populatePermissionsTable(permissions, function (){
          configPermissionTable(function(){
            $scope.permissionsTable = permissionsTable;
          })
        });
      }, function(error){
        exceptionService.catcher("PermissionsService query failed")(error);
      });

    function populatePermissionsTable(permissions, cb){
      permissions.forEach(function (permission) {
        var permissionData = [];
        permissionData.push( {"value": permission._id, "showIt": true} );
        permissionData.push( {"value": permission.name, "showIt": true} );
        permissionData.push( {"value": permission.type, "showIt": true} );
        permissionData.push( {"value": permission.url, "showIt": true} ); 
        permissionData.push( {"value": permission.description, "showIt": true} );
        permissionData.push( {"value": permission.model, "showIt": true} );
        permissionsTable.data.push(permissionData);
      });
      cb();
    };
    function configPermissionTable(cb){
      permissionsTable.detailView='permissionInfo';
      permissionsTable.entity='permission';
      permissionsTable.entityC='Permission';
      permissionsTable.entityCP='Permissions';
      permissionsTable.ready = true;
      cb();
    };
  };
})();