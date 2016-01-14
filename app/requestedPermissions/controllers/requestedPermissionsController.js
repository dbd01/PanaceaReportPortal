(function(){
  "use strict";

  angular.module('PanaceaReports').controller("requestedPermissionsController", requestedPermissionsController);
  requestedPermissionsController.$inject= ['requestedPermissionsService', '$scope', 'exceptionService'];
  function requestedPermissionsController(requestedPermissionsService, $scope, exceptionService ) {
    var requestedPermissionsTable ={
      "header": [
        { "title": {en: "Id", el:"Αναγνωριστικό"},  "showIt": true },
        { "title": {en: "Name", el:"Όνομα"},  "showIt": true },
        { "title": {en: "User", el:"Χρήστης"}, "showIt": true },
        { "title": {en: "Application", el:"Εφαρμογή"}, "showIt": true }
      ],
      "headers": [
        { "title": "",  "showIt": true },
        { "title": "",  "showIt": true },
        { "title": "", "showIt": true },
        { "title": "", "showIt": true }
      ],
      "data": [],
      "ready": false
    }    

    requestedPermissionsService.query().$promise.then(
      function (requestedPermissions) {
        populateRequestedPermissionsTable(requestedPermissions, function(){
          configRequestedPermissionsTable(function(){
            $scope.requestedPermissionsTable = requestedPermissionsTable;
          });
        });
      },
      function(error){
        exceptionService.catcher("RequestedPermissionsService query failed")(error);
      });

    function populateRequestedPermissionsTable(requestedPermissions, cb){
      requestedPermissions.forEach(function (requestedPermission) {
        var requestedPermissionData = [];
        requestedPermissionData.push( {"value": requestedPermission._id, "showIt": true} );
        requestedPermissionData.push( {"value": requestedPermission.name, "showIt": true} );
        requestedPermissionData.push( {"value": requestedPermission.User.username, "showIt": true} );
        requestedPermissionData.push( {"value": requestedPermission.Application.name, "showIt": true} );
        requestedPermissionsTable.data.push(requestedPermissionData);
      });
      cb();
    };
    function configRequestedPermissionsTable(cb){
      requestedPermissionsTable.detailView='permissionInfo';
      requestedPermissionsTable.entity='requested permission';
      requestedPermissionsTable.entityC='Requested Permission';
      requestedPermissionsTable.entityCP='Requested Permissions';
      requestedPermissionsTable.ready = true;
      cb();
    };
  };
})();