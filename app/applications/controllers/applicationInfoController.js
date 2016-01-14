(function(){
  "use strict";

  angular.module('PanaceaReports').controller("applicationInfoController", applicationInfoController);

  applicationInfoController.$inject=['$state', 'applicationsService', 'groupsService','$scope', 'scopeComService', '$stateParams', 'exceptionService'];

  function applicationInfoController($state, applicationsService, groupsService, $scope , scopeComService, $stateParams, exceptionService) {
    var applicationTable ={
      "entity":null,
      "groups": [],
      "ready": false
    };
    var mode=$state.current.name;
    var _id=$stateParams.id;//scopeComService.list[0];
    var newData=scopeComService.list[0]
    scopeComService.flush();
    console.log(mode, _id, newData);
    if (mode.indexOf('remove')>-1){
      applicationsService.remove({ 'applicationId': _id }, function (response) {
        console.log("Application has been deleted successfully."); 
        $state.go('applications.allApplications')
      },function (response) {
        if (response.data == null){
          console.log("response  data is null! -(0)");
        }
        else{
          console.log("response (0) ->", response);
        }
      });
    }
    else if (mode.indexOf('new')>-1){
      var groups=groupsService.query(function(){
        applicationTable.groups=groups;
        applicationTable.entity={
          "_id":'',
          "name":'',
          "description":'',
          "url":'',
          "groups": []
        };
        $scope.applicationTable = applicationTable
        $scope.applicationTable.detailView='applicationInfo';
        $scope.applicationTable.gridView='applications';
        $scope.applicationTable.entityC='Application';
        $scope.applicationTable.entityCP='Applications';
        $scope.applicationTable.detailViewTemplate='app/applications/views/applicationInfoTemplate.html';
        $scope.applicationTable.context='forms';
        $scope.applicationTable.ready = true;
      });
    }
    else if (mode.indexOf('edit')>-1 || mode.indexOf('view')>-1 || mode.indexOf('deleted')>-1){
      var application=applicationsService.getOne({'applicationId': _id}, function(){
        var groups=groupsService.query(function(){
          applicationTable.entity=application;
          applicationTable.groups=groups;
          $scope.applicationTable = applicationTable;
          $scope.applicationTable.detailView='applicationInfo';
          $scope.applicationTable.gridView='applications';
          $scope.applicationTable.entityC='Application';
          $scope.applicationTable.entityCP='Applications';
          $scope.applicationTable.detailViewTemplate='app/applications/views/applicationInfoTemplate.html';
          $scope.applicationTable.context='forms';
          $scope.applicationTable.ready = true;
        }, function(error){
          exceptionService.catcher("GroupsService query failed")(error);
        });
      }, function(error){
        exceptionService.catcher("ApplicationService query failed")(error);
      });
    }
    else if (mode.indexOf('add')>-1){
      if (newData){
        var groupzIDz =[];
        for (var i=0; i< newData.groups.length; i++){
          groupzIDz[i] = newData.groups[i]._id; 
        }
        newData.groups=groupzIDz;
        applicationsService.add(newData, function (response) {
          console.log("Application has been added successfully!");
          $state.go('applications.allApplications');
        },function (response) {
          if (response.data == null){
            console.log("response data is null!!!!!");
            $scope.alert = { 
              type: 'danger',
              msg: 'No response from server'
            };
          }
          else{
            console.log("response ->", response);
            $scope.alert = {
              type: 'danger', 
              msg: response.data.message 
            };
          }
        });
      }
    }
    else if (mode.indexOf('update')>-1){
      if (newData){
        var groupzIDz =[];
        for (var i=0; i< newData.groups.length; i++){
          groupzIDz[i] = newData.groups[i]._id; 
        }
        newData.groups=groupzIDz;
        applicationsService.update({'applicationId': _id }, newData, function (response) {
          console.log("Application has been updated successfully.");
          $state.go('applications.allApplications');
        },function (response) {
          if (response.data == null){
            console.log("response data is null!!!!!");
            $scope.alert = {
              type: 'danger',
              msg: 'No response from server'
            };
          }
          else{
            $scope.alert = {
              type: 'danger',
              msg: response.data.message
            };
          }
        });
      }
    }
    else{
      //error
    }
  };

  function removeSuccessCb(){
    
  }
})();