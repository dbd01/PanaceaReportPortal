(function(){
  "use strict";

  angular.module('PanaceaReports').factory("permissionsService", permissionsService);
  permissionsService.$inject= ["$resource", "appSettings"];

  function permissionsService($resource, appSettings) {
    return $resource(appSettings.authServerPath + '/api/v1/permission/:id', null, {
      update: {
        method: 'PUT'
      },
      partialUpdate: { 
        method: 'PATCH'
      }
    });
  }
})();