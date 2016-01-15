(function(){
  "use strict";

  angular.module('PanaceaReports').factory("groupsService", groupsService);
  groupsService.$inject= ["$resource", "appSettings"];

  function groupsService($resource, appSettings) {
    return $resource(appSettings.authServerPath + '/api/v1/group/:id', null, {
      'update': { 
        method: 'PUT'
      },
      'partialUpdate': { 
        method: 'PATCH'
      }
    });
  }
})();