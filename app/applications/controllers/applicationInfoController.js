"use strict";

app.controller("applicationInfoController", ['applicationsService', 'groupsService','$scope', 'scopeComService',
  function (applicationsService, groupsService, $scope , scopeComService) {
    //fetch the groups list
    var groupsTbl ={
      "data": [],
      "ready": false
    };
    var applicationData = [];
    var _id=scopeComService.list[0];
    var mode=scopeComService.list[1];
    var deleted=false;
    if (scopeComService.list.length==3)
      deleted=true;
    scopeComService.flush();
    console.log("applicationInfoController: scopeComService.list: ", scopeComService.list);
    applicationsService.getOne({applicationId: _id}).$promise
    .then(function (application) {
      applicationData=application;
    })
    .then(function () {
      groupsService.query().$promise
      .then(function (groups) {
        groupsTbl.data=groups;
      }).then(function () {
        $scope.groupsTbl = groupsTbl;
        $scope.groupsTbl.ready = true;
      });
      scopeComService.add(mode);
      scopeComService.add(applicationData);
      if (deleted)
        scopeComService.add("deleted");
    });
  }
]);

