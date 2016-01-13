(function(){
  "use strict";

  angular.module('PanaceaReports').controller("applicationsController", ['localStorageService','applicationsService',
    '$scope', '$state', applicationsController]);
  function applicationsController(localStorageService, applicationsService , $scope, $state ) {
    var applicationsTable ={
      "header": [
        { "title": {en: "Id", el:"Αναγνωριστικό"},  "showIt": true },
        { "title": {en: "Name", el: "Όνομα"}, "showIt": true },
        { "title": {en: "Description", el: "Περιγραφή"}, "showIt": true },
        { "title": {en: "Url", el: "Url"}, "showIt": true }
      ],
      "headers": [
        { "title": "",  "showIt": true },
        { "title": "", "showIt": true },
        { "title": "", "showIt": true },
        { "title": "", "showIt": true }
      ],
      "data": [],
      "ready": false
    }

    if ($state.includes('applications.deletedApplications'))
      applicationsTable.mode='deleted';
    else
      applicationsTable.mode='editable';

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
      $scope.applicationsTable.detailView='applicationInfo';
      $scope.applicationsTable.entity='application';
      $scope.applicationsTable.entityC='Application';
      $scope.applicationsTable.entityCP='Applications';
    });
  };
})();