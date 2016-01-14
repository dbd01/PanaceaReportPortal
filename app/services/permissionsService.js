(function(){
  "use strict";

  angular.module('PanaceaReports').factory("permissionsService", permissionsService);
  permissionsService.$inject= ["$resource", "appSettings", "localStorageService"];

  function permissionsService($resource, appSettings, localStorageService) {
    return $resource(appSettings.authServerPath + '/api/v1/permission/:id', null, {
      /*query: { 
        method: 'GET', 
        isArray: true ,
        params: { permissionId: '' }               
      },
      getOne: {
        method: 'GET',
        params: { permissionId: '@permissionId' }
      },
      add: {
        method: 'POST'
      },*/
      update: {
        method: 'PUT',
        //params: { permissionId: '@permissionId' }
      },
      partialUpdate: { 
        method: 'PATCH',
        //params: { permissionId: '@permissionId' }
      },
      /*remove: { 
        method: 'DELETE',
        params: { permissionId: '@permissionId' }
      }*/
    });
  }
})();