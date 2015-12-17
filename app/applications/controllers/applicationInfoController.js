"use strict";

app.controller("applicationInfoController", ['$state', 'applicationsService', 'groupsService','$scope', 'scopeComService',
  function ($state, applicationsService, groupsService, $scope , scopeComService) {
    //fetch the groups list
    var applicationTable ={
      "application":null,
      "groups": [],
      "ready": false
    };
    var mode=scopeComService.list[0];
    var _id=scopeComService.list[1];
    var deleted=false;
    if (scopeComService.list.length==3)
      deleted=true;
    scopeComService.flush();
    if (mode=='remove'){
      applicationsService.remove({ applicationId: _id }, function (response) {
        console.log("Application has been deleted successfully."); 
        $state.go('applications.all')
      },function (response) {
        if (response.data == null){
          console.log("response  data is null! -(0)");
        }
        else{
          console.log("response (0) ->", response);
        }
      });
    }
    else if (mode=='add'){
      var groups=groupsService.query(function(){
        //console.log("applicationInfoController: groupsService: groups: ", groups);
        applicationTable.groups=groups;
        $scope.applicationTable = applicationTable
        scopeComService.add(mode);
        //$scope.ready=true;
        $scope.applicationTable.ready = true;
      });
    }
    else{
      var application=applicationsService.getOne({applicationId: _id}, function(){
        var groups=groupsService.query(function(){
          //console.log("applicationInfoController: groupsService: groups: ", groups);
          applicationTable.application=application;
          applicationTable.groups=groups;
          $scope.applicationTable = applicationTable
          scopeComService.add(mode);
          if (deleted)
            scopeComService.add("deleted");
          //$scope.ready=true;
          $scope.applicationTable.ready = true;
        });
      });
    }
  }
]);

