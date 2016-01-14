(function(){
  "use strict";

  angular.module('PanaceaReports').controller("applicationsController", applicationsController);
  applicationsController.$inject=['localStorageService', 'applicationsService', '$scope', '$state', 'exceptionService'];
  function applicationsController(localStorageService, applicationsService , $scope, $state, exceptionService ) {
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

    applicationsService.query().$promise.then(
      function (applications) {
        populateApplicationData(applications, function (applicationData){
          applicationsTable.data.push(applicationData);
          configApplicationsTable(function(){
            $scope.applicationsTable = applicationsTable;
          });
        });
      },
      function (error){
        exceptionService.catcher("ApplicationsService query failed")(error);
      });

    function populateApplicationData(applications, cb){
      applications.forEach(function (application) {
        var applicationData = [];
        applicationData.push( {"value": application._id, "showIt": true} );
        applicationData.push( {"value": application.name, "showIt": true} );
        applicationData.push( {"value": application.description, "showIt": true} );
        applicationData.push( {"value": application.url, "showIt": true} );
        cb(applicationData);
      });
    }

    function configApplicationsTable(cb){
      applicationsTable.detailView='applicationInfo';
      applicationsTable.entity='application';
      applicationsTable.entityC='Application';
      applicationsTable.entityCP='Applications';
      applicationsTable.ready = true;
      cb();
    }
  };
})();