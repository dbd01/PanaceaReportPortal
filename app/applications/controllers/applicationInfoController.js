"use strict";

app.controller("applicationInfoController", ['localStorageService', 'consoleService','applicationsService', 'groupsService','$scope', 'scopeComService','$location',
  function (localStorageService, consoleService, applicationsService, groupsService, $scope , scopeComService, $location ) {
    //fetch the groups list
    var groupsTbl ={
      "data": [],
      "ready": false
    }
    groupsService.query().$promise.then(function (groups) {
      groupsTbl.data=groups;
    }).then(function () {
      $scope.groupsTbl = groupsTbl;
      $scope.groupsTbl.ready = true;
    });
  }
]);

