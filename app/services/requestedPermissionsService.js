(function(){
  "use strict";

  angular.module('PanaceaReports').factory("requestedPermissionsService", requestedPermissionsService);
  requestedPermissionsService.$inject= ["$resource", "appSettings"];

  function requestedPermissionsService($resource, appSettings) {
    return $resource(appSettings.authServerPath + '/api/v1/requestedPermission/:id', null, {
    });
  }
})();