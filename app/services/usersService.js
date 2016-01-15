(function(){
  "use strict";

  angular.module('PanaceaReports').factory("usersService", userService);
  userService.$inject= ["$resource", "appSettings", "localStorageService"];

  function userService($resource, appSettings, localStorageService) {
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