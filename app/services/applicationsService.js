(function(){
  "use strict";
  
  angular.module('PanaceaReports').factory("applicationsService", applicationsService);
  applicationsService.$inject= ["$resource", "appSettings", "localStorageService"];
  
  function applicationsService($resource, appSettings, localStorageService) {
    return $resource(appSettings.authServerPath + '/api/v1/application/:id', null, {
      'update': { 
        method: 'PUT'
      },
      'partialUpdate': { 
        method: 'PATCH'
      }
    });
  }
})();