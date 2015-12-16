 "use strict";
 app
 .factory("applicationsService", ["$resource", "appSettings", "localStorageService", applicationsService])

 function applicationsService($resource, appSettings, localStorageService) {
  return $resource(appSettings.authServerPath + '/api/v1/application/:applicationId', {}, {
    query: { 
      method: 'GET', 
      isArray: true ,
      params: { applicationId: '' }
    },
    getOne: {
      method: 'GET',
      params: { applicationId: '@applicationId' }
    },
    add: {
      method: 'POST'
    },
    update: { 
      method: 'PUT',
      params: { applicationId: '@applicationId' }
    },
    partialUpdate: { 
      method: 'PATCH',
      params: { applicationId: '@applicationId' }
    },
    remove: { 
      method: 'DELETE',
      params: { applicationId: '@applicationId' }
    }
  });
}