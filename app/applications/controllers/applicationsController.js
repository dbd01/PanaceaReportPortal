(function(){
  "use strict";

  angular.module('PanaceaReports').controller("applicationsController", applicationsController);
  applicationsController.$inject=['localStorageService', 'applicationsService', '$scope', '$state', 'exceptionService', '$rootScope'];
  function applicationsController(localStorageService, applicationsService , $scope, $state, exceptionService, $rootScope ) {
    var customMessages={
      actionFailedError:{
        en:function(serviceName, actionName){
          return serviceName+" failed on action: "+actionName+".";
        },
        el:function(serviceName, actionName){
          return "H υπηρεσία "+ serviceName+" απέτυχε να εκτελέσει τη δράση: "+actionName+".";
        },
      }
    };

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
    };

    applicationsService.query().$promise.then(
      function (applications) {
        populateApplicationsTable(applications, function (){
          configApplicationsTable(function(){
            $scope.applicationsTable = applicationsTable;
          });
        });
      },
      function (error){
        exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]("ApplicationsService", "query"))(error);
      });

    function populateApplicationsTable(applications, cb){
      applications.forEach(function (application) {
        var applicationData = [];
        applicationData.push( {"value": application._id, "showIt": true} );
        applicationData.push( {"value": application.name, "showIt": true} );
        applicationData.push( {"value": application.description, "showIt": true} );
        applicationData.push( {"value": application.url, "showIt": true} );
        applicationsTable.data.push(applicationData);
      });
      cb();
    }

    function configApplicationsTable(cb){
      if ($state.includes('applications.deletedApplications'))
        applicationsTable.mode='deleted';
      else
        applicationsTable.mode='editable';
      applicationsTable.detailView='applicationInfo';
      applicationsTable.entity='application';
      applicationsTable.entityC='Application';
      applicationsTable.entityCP='Applications';
      applicationsTable.ready = true;
      cb();
    }
  }
})();