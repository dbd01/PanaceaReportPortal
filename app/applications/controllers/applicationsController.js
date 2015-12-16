"use strict";

app.controller("applicationsController", ['localStorageService','consoleService' ,'applicationsService','$scope', '$state',
  function (localStorageService, consoleService, applicationsService , $scope, $state ) {
    var authData = localStorageService.get('authorizationData');
    consoleService.printIt("auth data--appl>", authData);
    var applicationsTable ={
      "header": [
        { "title": "_id",  "showIt": true },
        { "title": "name", "showIt": true },
        { "title": "description", "showIt": true },
        { "title": "url", "showIt": true }
      ],
      "data": [],
      "ready": false,
      "mode": ""
    }
    applicationsService.query().$promise
    .then(function (applications) {
      applications.forEach(function (application) {
        var applicationData = [];
        applicationData.push( {"value": application._id, "showIt": true} );
        applicationData.push( {"value": application.name, "showIt": true} );
        applicationData.push( {"value": application.description, "showIt": true} );
        applicationData.push( {"value": application.url, "showIt": true} );
        applicationsTable.data.push(applicationData);
      });
    })
    .then(function () {
      $scope.applicationsTable = applicationsTable;
      $scope.applicationsTable.ready = true;
      if ($state.includes('applications.deleted'))
        $scope.applicationsTable.mode='deleted';
      else
        $scope.applicationsTable.mode='editable';
      $scope.applicationsTable.detailView='applicationInfo';
      $scope.applicationsTable.detailViewDeleted='applicationInfodeleted';
    });
}]);

