(function(){
  "use strict";

  angular.module('PanaceaReports').factory("groupsService", groupsService);
  groupsService.$inject= ["$resource", "appSettings", "localStorageService"];

  function groupsService($resource, appSettings, localStorageService) {
    return $resource(appSettings.authServerPath + '/api/v1/group/:groupId', {}, {
      query: { 
        method: 'GET', 
        isArray: true ,
        params: { groupId: '' }
      }, 
      getOne: {
        method: 'GET',
        params: { groupId: '@groupId' }
      },
      add: {
        method: 'POST'
      },
      update: { 
        method: 'PUT',
        params: { groupId: '@groupId' }
      },
      partialUpdate: { 
        method: 'PATCH',
        params: { groupId: '@groupId' }
      },
      remove: { 
        method: 'DELETE',
        params: { groupId: '@groupId' }
      }
    });
  }
})();