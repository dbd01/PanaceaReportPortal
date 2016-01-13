(function(){
"use strict";

  angular.module('PanaceaReports').controller("permissionsController", permissionsController);
  permissionsController.$inject= ['localStorageService', 'permissionsService', '$scope', '$state'];
  function permissionsController(localStorageService, permissionsService, $scope, $state ) {
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
      }).then(function () {
        $scope.permissionsTable = permissionsTable;
        $scope.permissionsTable.ready = true;
        $scope.permissionsTable.detailView='permissionInfo';
        $scope.permissionsTable.entity='permission';
        $scope.permissionsTable.entityC='Permission';
        $scope.permissionsTable.entityCP='Permissions';
      }
    );
  };
})();