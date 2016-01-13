(function(){
  "use strict";

  angular.module('PanaceaReports').factory("usersService", userService);
  userService.$inject= ["$resource", "appSettings", "localStorageService"];

  function userService($resource, appSettings, localStorageService) {
    return $resource(appSettings.authServerPath + '/api/v1/user/:userId', {}, {
      query: { 
        method: 'GET', 
        isArray: true ,
        params: { userId: '' }
      },
      getOne: {
        method: 'GET',
        params: { userId: '@userId' }
      },
      add: {
        method: 'POST'
      },
      update: { 
        method: 'PUT',
        params: { userId: '@userId' }
      },
      partialUpdate: { 
        method: 'PATCH',
        params: { userId: '@userId' }
      },
      remove: { 
        method: 'DELETE',
        params: { userId: '@userId' }
      }
    });
  }
})();