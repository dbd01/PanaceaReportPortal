(function(){
  "use strict";

  angular.module('PanaceaReports').factory("requestedPermissionsService", requestedPermissionsService);
  requestedPermissionsService.$inject= ["$resource", "appSettings", "localStorageService"];

  function requestedPermissionsService($resource, appSettings, localStorageService) {
    return $resource(appSettings.authServerPath + '/api/v1/requestedPermission/:requestedPermissionId', {}, {
      query: { 
        method: 'GET',
        isArray: true,
        params: { permissionId:''}
      },
      remove: { 
        method: 'DELETE',
        params: { permissionId: '@permissionId'}
      }
    });
  }
})();