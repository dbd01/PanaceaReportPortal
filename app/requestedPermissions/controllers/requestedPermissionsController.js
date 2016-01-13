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
        requestedPermissions.forEach(function (requestedPermission) {
          var requestedPermissionData = [];
          requestedPermissionData.push( {"value": requestedPermission._id, "showIt": true} );
          requestedPermissionData.push( {"value": requestedPermission.name, "showIt": true} );
          requestedPermissionData.push( {"value": requestedPermission.User.username, "showIt": true} );
          requestedPermissionData.push( {"value": requestedPermission.Application.name, "showIt": true} ); 
          requestedPermissionsTable.data.push(requestedPermissionData);
        });
      }, function(error){
        exceptionService.catcher("RequestedPermissionsService query failed")(error);
      })
    .then(function () {
      $scope.requestedPermissionsTable = requestedPermissionsTable;
      $scope.requestedPermissionsTable.ready = true;
      $scope.requestedPermissionsTable.detailView='permissionInfo';
      $scope.requestedPermissionsTable.entity='requested permission';
    });
  };
})();