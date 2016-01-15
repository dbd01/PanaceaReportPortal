(function(){
  "use strict";

  angular.module('PanaceaReports').factory("usersService", userService);
  userService.$inject= ["$resource", "appSettings"];

  function userService($resource, appSettings) {
    return $resource(appSettings.authServerPath + '/api/v1/user/:id', {}, {
      update: { 
        method: 'PUT'
      },
      partialUpdate: { 
        method: 'PATCH'
      }
    });
  }
})();